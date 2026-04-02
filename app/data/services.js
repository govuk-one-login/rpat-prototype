module.exports = {
  services: [
    {
      id: "find-a-tender",
      name: "Find a Tender",
      description: "Digital service for finding and applying for public sector contracts",
      environments: {
        integration: {
          status: "active",
          config: {
            serviceName: "Find a Tender",
            scopes: ["openid", "email"],
            redirectUrls: ["https://integration.find-a-tender.service.gov.uk/callback"],
            tokenAuthMethod: "private_key_jwt",
            publicKeyType: "JWKS",
            jwksUrl: "https://integration.find-a-tender.service.gov.uk/.well-known/jwks.json",
            idTokenSigningAlgorithm: "ES256",
            sectorIdentifierUri: "https://find-a-tender.service.gov.uk",
            isActive: true,
            identityVerificationSupported: true,
            claims: [
              "https://vocab.account.gov.uk/v1/coreIdentityJWT",
              "https://vocab.account.gov.uk/v1/address"
            ],
            landingPageUrl: "https://integration.find-a-tender.service.gov.uk/landing",
            levelsOfConfidence: ["P2"],
            contacts: ["team@find-a-tender.service.gov.uk"],
            postLogoutRedirectUrls: ["https://integration.find-a-tender.service.gov.uk/signed-out"],
            backChannelLogoutUrls: [],
            serviceType: "MANDATORY",
            jarValidationRequired: true,
            channel: "web",
            pkceEnforced: true,
            maxAgeEnabled: true,
            permitMissingNonce: false,
            rateLimit: "2000 per minute"
          }
        },
        production: {
          status: "active",
          config: {
            serviceName: "Find a Tender",
            scopes: ["openid", "email"],
            redirectUrls: ["https://find-a-tender.service.gov.uk/callback"],
            tokenAuthMethod: "private_key_jwt",
            publicKeyType: "JWKS",
            jwksUrl: "https://find-a-tender.service.gov.uk/.well-known/jwks.json",
            idTokenSigningAlgorithm: "ES256",
            sectorIdentifierUri: "https://find-a-tender.service.gov.uk",
            isActive: true,
            identityVerificationSupported: true,
            claims: [
              "https://vocab.account.gov.uk/v1/coreIdentityJWT",
              "https://vocab.account.gov.uk/v1/address"
            ],
            landingPageUrl: "https://find-a-tender.service.gov.uk/landing",
            levelsOfConfidence: ["P2"],
            contacts: ["team@find-a-tender.service.gov.uk"],
            postLogoutRedirectUrls: ["https://find-a-tender.service.gov.uk/signed-out"],
            backChannelLogoutUrls: [],
            serviceType: "MANDATORY",
            jarValidationRequired: true,
            channel: "web",
            pkceEnforced: true,
            maxAgeEnabled: true,
            permitMissingNonce: false,
            rateLimit: "2000 per minute"
          }
        }
      }
    },
    {
      id: "apply-for-legal-aid",
      name: "Apply for legal aid",
      description: "Service for citizens to check eligibility and apply for legal aid",
      environments: {
        integration: {
          status: "active",
          config: {
            serviceName: "Apply for legal aid",
            scopes: ["openid", "email", "phone"],
            redirectUrls: [
              "https://integration.apply-for-legal-aid.service.gov.uk/callback",
              "https://integration.apply-for-legal-aid.service.gov.uk/callback2"
            ],
            tokenAuthMethod: "private_key_jwt",
            publicKeyType: "JWKS",
            jwksUrl: "https://integration.apply-for-legal-aid.service.gov.uk/.well-known/jwks.json",
            idTokenSigningAlgorithm: "RS256",
            sectorIdentifierUri: "https://apply-for-legal-aid.service.gov.uk",
            isActive: true,
            identityVerificationSupported: false,
            claims: [],
            landingPageUrl: "",
            levelsOfConfidence: [],
            contacts: ["team@apply-for-legal-aid.service.gov.uk"],
            postLogoutRedirectUrls: ["https://integration.apply-for-legal-aid.service.gov.uk/signed-out"],
            backChannelLogoutUrls: [],
            serviceType: "OPTIONAL",
            jarValidationRequired: false,
            channel: "web",
            pkceEnforced: true,
            maxAgeEnabled: false,
            permitMissingNonce: true,
            rateLimit: "1000 per minute"
          }
        },
        production: null
      }
    }
  ]
};
