# Inmobiliaria Sancari — Sitio Web

Sitio web oficial de Inmobiliaria Sancari, integrado con Tokko Broker CRM.

## Estructura del proyecto

```
/
├── index.html                        # Web completa (HTML + CSS + JS)
├── netlify.toml                      # Configuración de Netlify
└── netlify/
    └── functions/
        ├── propiedades.js            # Proxy → API Tokko (propiedades)
        └── contacto.js              # Proxy → API Tokko (leads/contacto)
```

## Integración con Tokko Broker

Las propiedades se cargan vía Netlify Functions para evitar bloqueos CORS.

- **Endpoint propiedades:** `/.netlify/functions/propiedades?limit=100&offset=0`
- **Endpoint contacto:** `/.netlify/functions/contacto` (POST)
- **API Key Tokko:** configurada en cada function
- **Company ID:** 45952

## Deploy en Netlify

1. Crear repositorio en GitHub y subir este código
2. En Netlify → "Add new site" → "Import an existing project" → conectar con GitHub
3. Configuración de build:
   - **Build command:** (dejar vacío)
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
4. Publicar

El deploy desde GitHub activa correctamente las Netlify Functions, a diferencia del deploy manual (drag & drop).

## Dominio

- **Dominio:** inmobiliariasancari.com.ar (registrado en NIC.ar)
- **Hosting:** Netlify (proyecto: fanciful-sunburst-881d6c)
- **Nameservers NIC.ar:** dns1-dns4.p03.nsone.net

## Contacto

- WhatsApp: +54 9 11 3931-4540
- Email: francosancari@gmail.com
- Dirección: Av. Montes de Oca 456, Barracas, CABA
