import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    // POST /submit
    if (req.method === 'POST' && path === 'submit') {
      const body = await req.json()
      const { email, message, selections, priceEstimate, totalPrice, monthlyPrice } = body

      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { error } = await supabase
        .from('price_calculator_submissions')
        .insert({
          email,
          message: message || '',
          selections: selections || {},
          total_price: totalPrice || 0,
          monthly_price: monthlyPrice || 0,
          price_estimate: priceEstimate || '',
        })

      if (error) {
        console.error('DB insert error:', error)
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Submission saved' }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // POST /calculator-lead
    if (req.method === 'POST' && path === 'calculator-lead') {
      const body = await req.json()
      const { businessType, selectedAddons, recommendedPackage, email } = body

      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { error } = await supabase
        .from('price_calculator_leads')
        .insert({
          business_type: businessType || '',
          selected_addons: selectedAddons || [],
          recommended_package: recommendedPackage || '',
          email,
        })

      if (error) {
        console.error('DB insert error:', error)
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Calculator lead saved' }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // POST /cookie-consent
    if (req.method === 'POST' && path === 'cookie-consent') {
      const body = await req.json()
      const { status, userAgent } = body

      if (!status) {
        return new Response(
          JSON.stringify({ error: 'Status is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { error } = await supabase
        .from('cookie_consent')
        .insert({
          status,
          user_agent: userAgent || 'unknown',
        })

      if (error) {
        console.error('DB insert error:', error)
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Consent recorded' }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // GET /health
    if (req.method === 'GET' && path === 'health') {
      return new Response(
        JSON.stringify({ status: 'active', message: 'MST Studios API is running' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
