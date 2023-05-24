
-----------------------------------------------------------------------
##### React 18 & Next.js 13 ` "use client" `
- app folder by default uses react server components to enhance loading
- https://nextjs.org/learn/foundations/how-nextjs-works/rendering
- Declare
```
 "use client" 
 ```

on top of component to change to switch to client side component
##### Data fetching
- Server Side Rendering (SSR): Use `{ cache: 'no-store '}` to remove caching
- Static Site Generation (SSG): Static site
- Incremental Static Generation (ISR): `{ next: { revalidate: 10 } }` 
combinds SSR + SSG for dynamic content & static sites, specifies certain data to be fetched at build time while defining revalidate time interval, refreshes data.

------------------------------------------------------------------------
## Dev process:
- `npx create-next-app`

#### Install dependencies: `npm install --legacy-peer-deps`

```
    "dependencies": {
    "@babel/core": "^7.17.9",
    "@sanity/client": "^3.2.0",
    "@sanity/image-url": "^1.0.1",
    "@stripe/stripe-js": "^1.25.0",
    "canvas-confetti": "^1.5.1",
    "next": "12.1.0",
    "next-sanity-image": "^3.2.1",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-hot-toast": "^2.2.0",
    "react-icons": "^4.3.1",
    "stripe": "^8.209.0"
  },
  "devDependencies": {
    "@babel/preset-react": "^7.16.7",
    "eslint": "8.13.0",
    "eslint-config-next": "12.1.4"
  }
```

###### `@sanity/client` & `@sanity/image-url` for dynamically change content (products)
`@sanity/image-url` package is a helper library for working with images in Sanity.io, which is a headless content management system (CMS) for building structured content websites and applications. The imageUrlBuilder function is used to generate URLs for images stored in a Sanity.io dataset.

###### `stripe` & `@stripe/stripe-js` implement stripe payment gateway

###### `canvas-confetti` for aesthetic purposes

###### `next-sanity-image` to process images

###### `react-hot-toast` Smoking hot Notifications for React.

###### `react-icons` react icons

###### `@babel/preset-react` compiler for react

#### Sanity

- `npm install -g @sanity/cli` to install sanity cli, in this case globally with `-g` flag
- `npm create sanity@latest -- --template get-started --project [put-project-id-here] --dataset production --provider github`
  \*\*\* .gitignore node_modules to include sanity node_modules as well
- `sanity start` to run studio
- create custom schemas for sanity in schemas folder
- import custom schemas in schema.js file & export createSchema
- data schemas should now show up in studio
- `*[_type == "product"]` * means all, so `*[_type == "product"]` means all data with type of product 

#### Next.js

- es7 snippet extension for vsc allows the use of `rafce` to generate boilerplate for react component
- Enable babel support for next.js:
 .babelrc =>

```
{
  "presets": ["@babel/preset-react"]
}
```

 .eslintrc.json =>

```
{
  "extends": [ "next/babel", "next/core-web-vitals"]
}
```

##### Folder structures:

- [pages/](pages/) Router center
- [pages/index.js](pages/index.js) Main page
- [pages/_app.js](pages/_app.js) Custom app. When a page is rendered in Next.js, it is wrapped in the _app.js component, which provides a common layout and behavior for all pages. This allows avoiding duplicating code across multiple pages.
- [pages/product/[slug].js](pages/product/[slug].js) Display product page, gets params from parent element, similar to useParams(), but in file-based routing of Next.js. Uses getStaticProps to pre-render ahead of user request and if the data comes from a headless CMS, which is Sanity. This can improve UX.
- [pages/api](pages/api) Backend, does not get rendered on front-end, but since I use CMS (Sanity), this now just stores 
- [pages/api/stripe.js](pages/api/stripe.js) handles stripe payment method

<details>
<summary>Details on app.js</summary>
  - Define global styles: You can use _app.js to define global styles that are applied to all pages in your application. This can include CSS resets, typography styles, and other common styles.
  - Provide a layout component: You can use _app.js to define a layout component that is applied to all pages in your application. This can include a header, footer, or other common elements that appear on every page.
  - Initialize global state: You can use _app.js to initialize global state for your application, such as user authentication or localization settings.
  - Add custom components or libraries: You can use _app.js to add custom components or third-party libraries that are used across multiple pages in your application.
  - Handle errors or loading states: You can use _app.js to handle errors or loading states that occur across multiple pages in your application, such as displaying a loadingindicator or error message when a page is loading or encountering an error.
</details>

- [components/](components/) Components, uses [components/index.js] for better managing components.
- [components/HeroBanner.jsx](components/HeroBanner) Display sales, get prop from index.js and display hero banner
- [components/HeroBanner.jsx](components/HeroBanner) Display footer, get prop from index.js and display footer banner
- [components/Product.jsx](components/HeroBanner) Display products, get prop from index.js
- [components/Layout.jsx](components/HeroBanner) Layout body for website, get prop of children and render children, header, main, footer. Used in _app.js

- [lib/](lib/) Connect app to Sanity, for API calls & data manipulations
- [lib/client.js](lib/client) Sanity client
- [lib/getStripe.js](lib/getStripe.js) Load Stripe

- [context](context/) Manage cart states
- [context/CartContext.js](context/CartContext.js) Wraps CartContext around other elements in _app.js, manage cart states, used in slug.js to get state inputs from user, navbar.js to show cart
