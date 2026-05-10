// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

let supabase: any = null

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables not configured')
      return null
    }

    supabase = createClient(supabaseUrl, supabaseKey)
  }
  return supabase
}

// Session management
export const getOrCreateSession = async () => {
  const client = getSupabaseClient()
  if (!client) return null

  const sessionId = localStorage.getItem('portfolio_session_id') ||
                   `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  localStorage.setItem('portfolio_session_id', sessionId)

  try {
    // Check if session exists
    const { data: existing } = await client
      .from('visitor_sessions')
      .select('id')
      .eq('session_id', sessionId)
      .single()

    if (!existing) {
      // Create new session
      await client.from('visitor_sessions').insert({
        session_id: sessionId,
        user_agent_hash: btoa(navigator.userAgent).substring(0, 32), // Truncated hash
        ip_hash: 'not_collected', // Respect privacy
        referrer: document.referrer,
        consent_given: localStorage.getItem('gdpr_consent') === 'true'
      })
    }

    return sessionId
  } catch (error) {
    console.error('Session creation error:', error)
    return null
  }
}

// Track interactions
export const trackInteraction = async (
  elementType: string,
  elementId?: string,
  elementData?: any
) => {
  const client = getSupabaseClient()
  if (!client) return

  try {
    const sessionId = await getOrCreateSession()
    if (!sessionId) return

    await client.from('visitor_interactions').insert({
      session_id: sessionId,
      page_url: window.location.pathname,
      element_type: elementType,
      element_id: elementId,
      element_data: elementData
    })
  } catch (error) {
    console.error('Interaction tracking error:', error)
  }
}

// Track contact submission
export const trackContactSubmission = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  const client = getSupabaseClient()
  if (!client) return

  try {
    const sessionId = await getOrCreateSession()
    if (!sessionId) return

    await client.from('contact_submissions').insert({
      session_id: sessionId,
      ...formData
    })
  } catch (error) {
    console.error('Contact tracking error:', error)
  }
}

// GDPR compliance - delete user data
export const deleteUserData = async (sessionId: string) => {
  await supabase.from('visitor_interactions').delete().eq('session_id', sessionId)
  await supabase.from('contact_submissions').delete().eq('session_id', sessionId)
  await supabase.from('visitor_sessions').delete().eq('session_id', sessionId)
}