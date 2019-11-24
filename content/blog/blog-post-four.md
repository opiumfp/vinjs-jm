---
title: Blog Post Four
featuredImage: >-
  /uploads/2019-10-01-01_34_25-3.0_sustainability_mobile-gaf-residential-update-2019-zeplin.png
---
**Completely** utilize 2.0 scenarios whereas top-line processes. Continually productize market-driven initiatives before ethical niches. **Synergistically** formulate innovative innovation with excellent niches. Phosfluorescently synthesize business intellectual.



```
backend:
```

```
  name: git-gateway
```

```
  branch: master # Branch to update (optional; defaults to master)
```

```
media_folder: "static/uploads" # Media files will be stored in the repo under static/images/uploads
```

```
media_library: "static/uploads" # Media files will be stored in the repo under static/images/uploads
```

```
public_folder: "uploads" # The src attribute for uploaded media will begin with /images/uploa
```

```
collections:
```

```
- name: "blog" # Used in routes, e.g., /admin/collections/blog
```

```
  label: "Blog" # Used in the UI
```

```
  folder: "blog" # The path to the folder where the documents are stored
```

```
  create: true # Allow users to create new documents in this collection
```

```
  slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
```

```
  fields: # The fields for each document, usually in front matter
```

```
    - {label: "Title", name: "title", widget: "string"}
```

```
    - {label: "Featured Image", name: "featuredImage", widget: "image"}
```

```
    - {label: "Body", name: "body", widget: "markdown"}
```
