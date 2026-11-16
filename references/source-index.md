# Source index

This index records what informed the packaged workflows and what each source can establish. Access date for live sources checked during this package work: November 16, 2026. When a page did not state a publication date or license, it is recorded as “not stated.” Mutable documentation should be checked again before later implementation.

## Capability-to-source map

| Capability | Packaged workflow | Sources and contribution |
|---|---|---|
| Plugin entry, skill routing, and capability menu | frontend-router; plugin.json; README | O1 and O2 establish the documented package/skill mechanisms. P1–P4 supply the requested workflow and release gate. Official docs do not establish bare-mention behavior. |
| Product-aware art direction, design contract, and landing pages | art-direction; landing-page-builder; design-contract.md; design-rubric.md | P2–P4, U1, U4, and U5 informed project discovery, work modes, explicit context sources, and recorded conflicts. Competitor benchmark claims remain project-reported, not proof of this package's quality. |
| Anti-generic pattern review and source signals | anti-generic-review.md; scripts/check_ui_signals.py; rendered-ui-review | U1, U2, and U4 inform contextual signal triage and exception handling. The local checker is original and intentionally narrow; it does not copy upstream rule lists or assess aesthetics. |
| Task- and stack-relevant design reference retrieval | design-pattern-index.md; frontend-router | U3 informs task/domain/stack-oriented retrieval and a no-match fallback. P3 remains the source catalog; linked materials are for study and are not bundled. |
| Logos and interface icons | logo-and-icons | P2–P3 document original SVG, small-size checks, consistent iconography, and license/trademark separation. No third-party icon or logo assets are bundled. |
| Loading, uploads, checkout, and orders | interaction-states; interaction-state-recipes.md; transaction-states.tsx | W1 explains status messages; W2 shows one informative progress-announcement technique; W3 defines the ARIA progressbar role; WC1–WC2 document WooCommerce's order flow and checkout statuses; S2 covers server-side upload controls. P2–P3 document truthful operation states and retry/duplicate safety. |
| Motion and scroll | motion-and-scroll; scroll-progress.css; threejs-scroll-patterns.md | M1 explains the reduced-motion preference; W4 describes CSS scroll/view timelines and their browser support caveat. P2–P3 list further scroll-driven sources. Existing examples keep static and reduced-motion paths. |
| Interactive 3D | interactive-3d; threejs-scroll-patterns.md | D1 and D2 support demand rendering and resource disposal; D3 covers a poster/lazy-loading path for model-viewer. P2–P3 distinguish mesh authoring from browser rendering. |
| Frontend security | frontend-security; security-performance-gates.md | S1 covers browser-side JavaScript/TypeScript risks; S2 covers file-upload controls. Both support scoped review, not system certification. |
| Performance and measurement | frontend-performance; security-performance-gates.md | G1 gives current Core Web Vitals metric targets; D1 covers a React Three Fiber performance pattern. P2–P3 distinguish field evidence from lab measurements. |
| Rendered UI, accessibility, and responsive review | rendered-ui-review; design-rubric.md; evaluations/scenarios.md | O3 and U1 inform aligned source/render comparisons, layout evidence, and limits of visual evaluation; W1 and W2 provide status/progress evidence; P2–P4 define the requested viewport, keyboard, motion, and tool-availability acceptance cases. A source index or scenario file is not a runtime test. |

## Source records

### Official plugin packaging and skills

**O1.** OpenAI. *Package your plugin*. OpenAI Developers. Date: not stated on the page. Accessed November 16, 2026. License: not stated. [Direct source](https://developers.openai.com/plugins/build/plugins).  
**Contribution:** Documents the portable root plugin.json, skills directory, OpenAI extension fields, onboardingSkill, and defaultPrompt. It says onboardingSkill runs when a user runs plugin setup; defaultPrompt supplies example prompts.  
**Limitation:** It does not say a bare composer mention displays default prompts or runs a packaged skill. These docs therefore cannot establish the bare-invocation gate.

**O2.** OpenAI. *Build skills*. OpenAI Developers. Date: not stated on the page. Accessed November 16, 2026. License: not stated. [Direct source](https://developers.openai.com/plugins/build/skills).  
**Contribution:** Documents one SKILL.md per skill directory, frontmatter name/description, and optional references, scripts, and assets. It explains skills as reusable workflow instructions.  
**Limitation:** A skill file does not supply external tools or guarantee identical dynamic loading on every host.

### Interaction state and accessibility

**W1.** W3C Web Accessibility Initiative. *Understanding Success Criterion 4.1.3: Status Messages*. WCAG 2.2 Understanding document. Updated October 4, 2026. Accessed November 16, 2026. The page points to W3C permissive-license rules; exact terms are not stated on the page. [Direct source](https://www.w3.org/WAI/WCAG22/Understanding/status-messages).  
**Contribution:** Explains that status changes such as waiting, progress, results, and errors should be programmatically determinable without moving focus.  
**Limitation:** This is an informative explanation of the success criterion; it does not choose application-specific state or server behavior.

**W2.** W3C Web Accessibility Initiative. *Technique ARIA25: Using an ARIA live region to convey the status of a progress bar*. WCAG 2.2 Techniques. Updated March 9, 2026. Accessed November 16, 2026. The page points to W3C permissive-license rules; exact terms are not stated on the page. [Direct source](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA25).  
**Contribution:** Demonstrates a separate polite status message for changing upload progress.  
**Limitation:** W3C labels techniques as examples, not required implementations; its example simulates an upload and is not production operation code.

**W3.** World Wide Web Consortium. *Accessible Rich Internet Applications (WAI-ARIA) 1.2*. W3C Recommendation, June 6, 2023. Accessed November 16, 2026. W3C permissive document-license rules apply; exact terms are not stated on the inspected page. [Direct source: progressbar role](https://www.w3.org/TR/wai-aria-1.2/#progressbar).  
**Contribution:** Defines the progressbar role semantics used when exposing real operation progress.  
**Limitation:** This role specification does not determine whether an application has valid or truthful progress data; that must come from the operation.

**W4.** Bramus Van Damme. *Animate elements on scroll with Scroll-driven animations*. Chrome for Developers. Published May 5, 2023. Accessed November 16, 2026. License: not stated on the inspected page. [Direct source](https://developer.chrome.com/docs/css-ui/scroll-driven-animations).  
**Contribution:** Explains CSS Scroll Timelines and View Timelines as declarative ways to link animation to scroll position.  
**Limitation:** It is a browser-specific guide and does not guarantee support in every target browser; check current compatibility and keep a fallback.

**WC1.** WooCommerce. *How the checkout block processes an order*. WooCommerce developer documentation. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the page. [Direct source](https://developer.woocommerce.com/docs/block-development/extensible-blocks/cart-and-checkout-blocks/how-checkout-processes-an-order/).  
**Contribution:** Describes the checkout phases and distinguishes pre-payment processing from the Store API request that attempts payment.  
**Limitation:** Documents WooCommerce's checkout implementation; it is an example of truthful operation-state design, not a general payment contract or guidance for other backends.

**WC2.** WooCommerce. *Checkout Store (wc/store/checkout)*. WooCommerce developer documentation. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the page. [Direct source](https://developer.woocommerce.com/docs/block-development/reference/data-store/checkout/).  
**Contribution:** Documents checkout store selectors and statuses used to represent the checkout process.  
**Limitation:** The store and its status names are specific to WooCommerce and may change with its software versions.

### Motion and 3D

**M1.** MDN contributors. *prefers-reduced-motion CSS media feature*. MDN Web Docs. Last modified June 10, 2026. Accessed November 16, 2026. The page says its content is available under a Creative Commons license; the exact version is not stated in the inspected footer. [Direct source](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).  
**Contribution:** Defines the browser media preference for reducing, removing, or replacing nonessential motion.  
**Limitation:** It does not prescribe the best fallback for a particular product; each interaction still needs review.

**D1.** pmndrs maintainers. *Scaling performance*. React Three Fiber documentation. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the documentation page. [Direct source](https://r3f.docs.pmnd.rs/advanced/scaling-performance).  
**Contribution:** Describes on-demand rendering for scenes that can rest.  
**Limitation:** The advice is specific to React Three Fiber and still requires device and scene measurement.

**D2.** Three.js contributors. *How to dispose of Objects*. Three.js Manual. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the manual page. [Direct source](https://threejs.org/manual/pages/how-to-dispose-of-objects.html).  
**Contribution:** Documents explicit disposal for unused geometries, materials, textures, and related renderer resources.  
**Limitation:** Cleanup ownership and shared-resource behavior remain application-specific.

**D3.** Google. *Lazy Loading*. model-viewer examples. Date: not stated on the page. Accessed November 16, 2026. Page license: not stated. The example notes its on-demand Draco decoder is Apache License 2.0; that decoder is not bundled here. [Direct source](https://modelviewer.dev/examples/loading/index.html).  
**Contribution:** Demonstrates a poster before model load, lazy loading, and a poster when a model is invalid.  
**Limitation:** model-viewer renders web-ready models; it does not author meshes. Example behavior does not prove suitability for every framework or model.

### Security

**S1.** OWASP. *JavaScript and TypeScript Security*. OWASP Cheat Sheet Series. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the inspected page. [Direct source](https://cheatsheetseries.owasp.org/cheatsheets/JavaScript_and_TypeScript_Security_Cheat_Sheet.html).  
**Contribution:** Supports review of unsafe browser APIs, dynamic evaluation, DOM injection, URL handling, and other JavaScript/TypeScript security boundaries.  
**Limitation:** Guidance is not a scanner, full application assessment, or certification.

**S2.** OWASP. *File Upload Cheat Sheet*. OWASP Cheat Sheet Series. Date: not stated on the page. Accessed November 16, 2026. License: not stated on the inspected page. [Direct source](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).  
**Contribution:** Covers upload extension/content checks, filenames, permissions, storage, and size limits.  
**Limitation:** Enforcement belongs on the server; browser-side validation and MIME declarations are not authoritative.

### Performance

**G1.** Google. *Understanding Core Web Vitals and Google Search results*. Google Search Central. Last updated December 10, 2025. Accessed November 16, 2026. Page content license: CC BY 4.0; code samples: Apache 2.0, as stated on the page. [Direct source](https://developers.google.com/search/docs/appearance/core-web-vitals).  
**Contribution:** States good targets of LCP within 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1.  
**Limitation:** The page describes real-world experience metrics and Search context; it does not guarantee rankings or every user's experience. Apply thresholds to appropriate field data and recheck for changes.

**G2.** Bryan McQuade and Barry Pollard. *How the Core Web Vitals metrics thresholds were defined*. web.dev. Published May 21, 2020; last updated May 7, 2025. Accessed November 16, 2026. Page content license: CC BY 4.0; code samples: Apache 2.0, as stated on the page. [Direct source](https://web.dev/articles/defining-core-web-vitals-thresholds).  
**Contribution:** Gives the 75th-percentile evaluation used with the good thresholds and explains the field-data basis.  
**Limitation:** The methodology article is not a per-project measurement. Collect appropriate field data before making a claim about a site's results.

### Publicly inspectable design-agent sources and comparators

**U1.** Moddingflow. *Better Design: UI/UX Design Skill for AI Coding Agents*. GitHub repository, current v1.8.0 source. Release published October 27, 2026. Accessed November 16, 2026. Repository LICENSE is MIT, an OSI-approved open-source license (see L3). [README](https://github.com/Moddingflow/better-design), [skill](https://github.com/Moddingflow/better-design/blob/main/skills/better-design/SKILL.md), [contract](https://github.com/Moddingflow/better-design/blob/main/skills/better-design/references/design-contract.md), [validation guide](https://github.com/Moddingflow/better-design/blob/main/skills/better-design/references/validation.md), [v1.8 benchmark](https://github.com/Moddingflow/better-design/blob/v1.8.0/docs/evaluations/bench-v1.8.0.md).  
**Contribution:** Informs explicit create/improve/audit/plan boundaries, inspection of project-owned design documents and code tokens, scoped exception records, and rendered layout/interaction evidence. The benchmark is a useful model for comparing independent briefs and showing first screens to blind reviewers.  
**Limitation:** The benchmark is maintainer-reported: six briefs, one model, one generation per brief and arm, two judges, and first screens only; mechanical checks also favor rules added to the newer version. It is a useful small evaluation, not an independent or broad quality result. No code, skill text, benchmark data, or assets are copied.

**U2.** Darcos-Loft maintainers. *fluid: Anti-generic design skills for AI agents*. GitHub repository, current main branch inspected November 16, 2026. Accessed November 16, 2026. Repository LICENSE is MIT, an OSI-approved open-source license (see L3). [README](https://github.com/Darcos-Loft/fluid), [detector overview](https://github.com/Darcos-Loft/fluid/blob/main/fluid/detector/README.md), [detector rules](https://github.com/Darcos-Loft/fluid/blob/main/fluid/detector/rules.mjs), [motion skill](https://github.com/Darcos-Loft/fluid/blob/main/fluid/SKILL.md).  
**Contribution:** Informs a read-only, deterministic checker with line-specific signals, explicit severity, configurable suppressions, and review alongside visual inspection.  
**Limitation:** The detector contains categorical style heuristics for fonts, colors, and layout as well as motion guidance; those rules can flag intentional brand choices and are not adopted here. The README's anti-generic and production claims are maintainer claims; no independent visual-quality evaluation was found in the inspected sources. The local checker remains independently written and limited to explicit placeholders and empty link targets.

**U3.** Next Level Builder. *UI UX Pro Max: AI skill for design intelligence*. GitHub repository, current main branch inspected November 16, 2026. Accessed November 16, 2026. Repository LICENSE is MIT, an OSI-approved open-source license (see L3). [README](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [current skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md), [relevance evaluator](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/scripts/evaluate-relevance.py), [v2.15.0 release notes](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases/tag/v2.15.0).  
**Contribution:** Informs retrieval by product task, platform, stack, and interaction concern, checking result fit, narrowing an off-topic search, and reporting when no verified match is found. Its release notes describe a graded relevance corpus, which is relevant to evaluating retrieval quality.  
**Limitation:** The relevance corpus and evaluation results are project-reported and test search routing/relevance, not rendered interface quality. The current branch is actively changing and can differ from release artifacts. No search data, code, or assets are copied.

**U4.** Miqdad Badjuber. *Anti Slop: Rules for AI Coding Agents*. GitHub repository, v3.2.30 release published November 13, 2026. Accessed November 16, 2026. Repository LICENSE is MIT, an OSI-approved open-source license (see L3). [README](https://github.com/miqdadbadjuber/anti-slop), [core rulebook](https://github.com/miqdadbadjuber/anti-slop/blob/main/skills/antislop/SKILL.md), [UI skill](https://github.com/miqdadbadjuber/anti-slop/blob/main/skills/antislop-ui/SKILL.md), [package checker](https://github.com/miqdadbadjuber/anti-slop/blob/main/scripts/check-repo.mjs), [releases](https://github.com/miqdadbadjuber/anti-slop/releases).  
**Contribution:** Informs separating visual direction from post-build anti-generic review, and keeping the review tied to a product-specific purpose. Its package checker illustrates metadata, route, and document consistency checks.  
**Limitation:** The README's before/after images are maintainer-selected demonstrations, not independent evaluations. Some rule language is prescriptive; no rule list or skill text is copied. The inspected checker validates package consistency, not rendered visual quality.

**U5.** aladicf. *better-web-ui: Opinionated frontend design Agent Skills package*. GitHub repository, version 2.4.0. README states the repository is in maintenance mode and directs active development to the sibling `better-react-web-ui` repository. Accessed November 16, 2026. Repository-level license is a custom MIT-based source-available license that requires free public source for distributed forks and prohibits selling or distributing the software as a proprietary paid product; it is not standard MIT or OSI-approved under the OSI free-redistribution criteria (see L4). Some individual skill files declare separate terms, including Apache 2.0 metadata for `frontend-design`; verify the exact file. [README](https://github.com/aladicf/better-web-ui), [setup skill](https://github.com/aladicf/better-web-ui/blob/main/skills/setup/SKILL.md), [routing fixtures](https://github.com/aladicf/better-web-ui/blob/main/scripts/check-skill-routing-fixtures.mjs), [repository license](https://github.com/aladicf/better-web-ui/blob/main/LICENSE), [package metadata](https://github.com/aladicf/better-web-ui/blob/main/package.json), [active React-focused successor README](https://github.com/aladicf/better-react-web-ui), [successor license](https://github.com/aladicf/better-react-web-ui/blob/main/LICENSE).  
**Contribution:** Informs repository-aware system discovery, a reusable project context artifact, focused skill routes, separation of subjective critique from technical audit, and positive/negative routing fixtures.  
**Limitation:** Its custom source-availability and no-sale terms are restrictive and do not make the repository open source. The README says active development moved to `better-react-web-ui`, which has the same custom license. The route fixtures check routing coverage, not design quality. No text, code, fixtures, or assets are copied.

**O3.** OpenAI. *Product Design plugin*. GitHub repository. Metadata version 0.1.52; license declared `Proprietary`. Accessed November 16, 2026. [Plugin metadata](https://github.com/openai/plugins/blob/main/plugins/product-design/.codex-plugin/plugin.json), [router](https://github.com/openai/plugins/blob/main/plugins/product-design/skills/index/SKILL.md), [design-QA skill](https://github.com/openai/plugins/blob/main/plugins/product-design/skills/design-qa/SKILL.md).  
**Contribution:** Informs the distinction between user-facing flow audits and pre-handoff design QA, and matching source and rendered evidence by route, viewport, state, theme, and content before judging visual differences.  
**Limitation:** The package metadata declares a proprietary license, so it is a workflow reference only. Its detailed comparison procedure is tool- and product-specific; its documents do not establish independent quality outcomes. No text, code, or assets are copied.

**L3.** Open Source Initiative. *The MIT License*. Accessed November 16, 2026. [Direct source](https://opensource.org/license/mit/).  
**Contribution:** Identifies the standard MIT license and displays the OSI-approved license designation, supporting the repository-level license classification for U1–U4.  
**Limitation:** It does not establish whether every individual third-party asset in those repositories is covered by the root license.

**L4.** Open Source Initiative. *The Open Source Definition*. Last modified February 16, 2024. Accessed November 16, 2026. [Direct source](https://opensource.org/osd).  
**Contribution:** Defines free redistribution and source availability criteria used to distinguish the custom no-sale license at U5 from an OSI-approved open-source license.  
**Limitation:** This is the OSI's definition, not a legal opinion about all uses of the U5 repository or separately licensed files.

### Package license

**L1.** 2q9e. *Source-Available View-Only License (SAVL-1.0)*. Repository root `LICENSE`; copyright year 2026, exact authoring date not stated in the text. Accessed November 16, 2026. Custom source-available terms; the license text states that it is not an open-source license. [Repository license](../LICENSE).  
**Contribution:** Grants limited viewing and private inspection for personal evaluation; reserves other rights and restricts copying, modification, deployment, and use of covered material by AI systems.  
**Limitation:** It applies only to material 2q9e owns or is authorized to license, excludes third-party material, and conflicts with operating this AI plugin unless a separate permission or license revision expressly allows that use.

**L2.** SPDX Workgroup. *10 Other licensing information detected*. SPDX Specification 2.3.1. Date: not stated on the inspected section. Accessed November 16, 2026. License: not stated on the page. [Direct source](https://spdx.github.io/spdx-spec/v2.3.1/other-licensing-information-detected/).  
**Contribution:** Documents the `LicenseRef-` form for identifying a custom license not on the SPDX License List; the manifest uses `LicenseRef-SAVL-1.0`.  
**Limitation:** The identifier is a reference label only; the included LICENSE text supplies the actual terms.

## Project-provided sources

**P1.** *AI Frontend Development Research: README*. Author: not stated in the file. Updated November 16, 2026. Accessed November 16, 2026. License: not stated. User-provided local source.  
**Contribution:** Defines the research scope and states the catalog is not an exhaustive market census.  
**Limitation:** It is a project note, not independent verification of each underlying source.

**P2.** *AI Frontend Development: Research Findings*. Author: not stated in the file. As of November 16, 2026. Accessed November 16, 2026. License: not stated. User-provided local source.  
**Contribution:** Synthesizes research on art direction, interaction states, motion, 3D, frontend security, performance, and rendered review.  
**Limitation:** It reports that examples were not all built or tested and does not claim exhaustive market coverage or independent visual-quality benchmarks.

**P3.** *AI Frontend Development: Reference Catalog*. Author: not stated in the file. Catalog date November 16, 2026. Accessed November 16, 2026. License: not stated. User-provided local source.  
**Contribution:** Supplies direct links to skills, tools, code examples, design systems, accessibility sources, and license caveats.  
**Limitation:** Its URL count is not a count of unique products; it says not every URL was exhaustively status-checked. Linked project claims and assets require source-level review before reuse.

**P4.** *Plugin Blueprint: AI Frontend Studio*. Author: not stated in the file. Date: not stated. Accessed November 16, 2026. License: not stated. User-provided local source.  
**Contribution:** Proposes the modular skill layout, project-aware workflow, quality gates, and evaluation scenarios.  
**Limitation:** The file describes a proposal, not a tested implementation.

**P5.** *AI Frontend Studio prototype package*. Author, creation date, and independent license: not stated in the files. Accessed November 16, 2026. User-provided local source.  
**Contribution:** Supplies the ten existing skill files, original transaction-state example, SVG mark, and supporting references retained in this package.  
**Limitation:** The repository's SAVL-1.0 covers only work its rights holder owns or is authorized to license; it must not be assumed to resolve the prototype files' unstated independent rights. Existing content is not evidence that the host loads the package or passes runtime scenarios.

**P6.** User-supplied build prompt, *Main prompt: build the AI Frontend Studio Codex plugin*. Author and publication date: not stated in the attachment. Received and accessed November 16, 2026. License: not stated.  
**Contribution:** Defines required route map, MCP decision map, safety requirements, evaluation cases, audit rounds, validation boundaries, and the bare-invocation release gate.  
**Limitation:** A requirement is not evidence that an implementation or host runtime satisfies it.

## Licensing and reuse notes

- This package includes no third-party code, skill text, datasets, screenshots, fonts, logos, icons, images, shaders, or 3D models. The links above are references for further study.
- The root LICENSE covers only material 2q9e owns or is authorized to license. It does not relicense external sources or their assets, and it does not establish the independent rights status of files retained from the prototype.
- SAVL-1.0 prohibits AI-system use of covered material. This conflicts with this package's intended AI-host use unless the rights holder grants separate permission or revises the license; do not claim AI-runtime authorization from the package manifest alone.
- `LicenseRef-SAVL-1.0` is an SPDX-style identifier for the custom license text; it does not broaden the license grant.
- Research notes describe some upstream licenses, but a license on a project’s code does not automatically cover its included trademarks, fonts, models, imagery, or datasets. Recheck the exact source and asset before adopting it.
- Google’s Core Web Vitals page states CC BY 4.0 for page content and Apache 2.0 for code samples. No Google sample code is copied into this package.
- The model-viewer loading page notes an Apache 2.0 Draco decoder loaded by the example; that decoder is not part of this package.
- “Not stated” is intentional wherever the inspected source did not identify an author, date, or license. No missing metadata has been inferred.
