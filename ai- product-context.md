## Product knowledge

This prototype is for the [GOV.UK One Login Admin interface](https://admin.sign-in.service.gov.uk/). When writing or reviewing content, refer to the [GOV.UK One Login technical documentation](https://github.com/govuk-one-login/tech-docs) and [GOV.UK One Login product pages](https://github.com/govuk-one-login/onboarding-product-page) for accurate terminology and descriptions.

Key files to reference in the [GOV.UK One Login tech docs](https://github.com/govuk-one-login/tech-docs):

| Topic | URL |
| --- | --- |
| Registering a service and client configuration fields | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/register-and-manage-your-service.html.md.erb |
| Creating individual configurations per service | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/create-individual-configurations-for-each-service.html.md.erb |
| Authentication levels | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/choose-the-level-of-authentication.html.md.erb |
| Identity confidence levels | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/choose-the-level-of-identity-confidence.html.md.erb |
| User attributes and scopes | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/choose-which-user-attributes-your-service-can-request.html.md.erb |
| Sector identifiers | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/choose-your-sector-identifier.html.md.erb |
| Public and private keys | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/set-up-your-public-and-private-keys.html.md.erb |
| Token authentication methods | https://github.com/govuk-one-login/tech-docs/blob/main/source/before-integrating/use-correct-token-authentication-method.html.md.erb |
| How GOV.UK One Login works | https://github.com/govuk-one-login/tech-docs/blob/main/source/how-gov-uk-one-login-works.html.md.erb |

Always check these docs to confirm terminology before suggesting or writing help text, labels, or hint text in the prototype.

### Services and Clients
In this prototype, a Service can have one or more clients — each client represents a separate configuration for a different environment (e.g. DEV, SIT, UAT, PreProd) in integration, plus optionally one production client when the service in One Login is made live.