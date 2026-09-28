# Apple Configuration Backend

This is the Apple target backend for Network-Configuration.

## Purpose

It compiles one canonical Apple source model into:

- .mobileconfig XML property lists.
- Declarative Device Management declaration JSON.
- A .mobileconfig declarations wrapper.
- MDM command property lists.
- Managed application configuration through Apple's Settings/ApplicationConfiguration command model.

The backend does not claim to implement Apple's private/internal server backend. It implements documented Device Management and Configuration Profile interfaces exposed by Apple.

## Source model

The source model is evidence-driven. Apple payload-specific keys are not guessed or normalized into invented fields. They are supplied under profile.payloads[].Content or declarations[].Payload and can later be constrained by evidence-backed target profiles.

## Delivery boundary

Configuration profiles, declarative management, and MDM commands are different delivery mechanisms. The compiler keeps them separate rather than pretending one format can configure every Apple setting.

## Signing and encryption

This backend currently generates unsigned XML property lists. Apple documents CMS signing and encryption for profiles; those cryptographic operations are a separate release-stage adapter so private keys are not embedded in the configuration compiler.

## Validation

Common Apple envelope fields are validated. Payload-specific validation must come from evidence-backed target profiles before a payload is promoted to verified Source of Truth.

## Commands

Validate:
node tools/apple-config.mjs validate profiles/source/apple-example.json

Generate a profile:
node tools/apple-config.mjs mobileconfig profiles/source/apple-example.json build/network.mobileconfig

Start the HTTP backend:
node apple/backend-server.mjs

Endpoints:
- GET /health
- POST /validate
- POST /compile/mobileconfig
- POST /compile/declarations
- POST /compile/declarations-profile
- POST /compile/mdm-command?index=0
