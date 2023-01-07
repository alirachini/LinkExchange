@component('mail::message')
<h1>We have received your request to Verify your account</h1>
<p>You can use the following code to verify your account:</p>

@component('mail::panel')
Pin code: {{ $token }}

<a href="https://backlink-exchange-software.herokuapp.com/verify-account">Click Here to verify your account </a>

@endcomponent

<p>The allowed duration of the code is one hour from the time the message was sent</p>
@endcomponent

