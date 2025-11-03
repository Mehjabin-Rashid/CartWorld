import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen text-gray-800">
            {/* Header removed to avoid duplication with global Nav in App.jsx */}

            {/* Hero Section */}
            <section id="hero" className="relative isolate">
                <div className="absolute inset-0 -z-10"/>
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:py-20 lg:px-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                            <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                            New season arrivals
                        </div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Shop smarter with curated picks and unbeatable deals
                        </h1>
                        <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg">
                            Discover trending products, handpicked categories, and exclusive discounts. Fast shipping and easy returns on every order.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#shop"
                                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/90"
                            >
                                Shop Now
                            </a>
                            <a
                                href="#deals"
                                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                Browse Deals
                            </a>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-gray-600 sm:grid-cols-4">
                            <div className="flex items-center gap-2">
                                <TruckIcon />
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldIcon />
                                Secure Payments
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshIcon />
                                Easy Returns
                            </div>
                            <div className="flex items-center gap-2">
                                <HeadsetIcon />
                                24/7 Support
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            className="w-full rounded-2xl border border-gray-200 object-cover shadow-sm"
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop"
                            alt="Trending products collage"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
                        <p className="mt-1 text-sm text-gray-600">Find what you love across popular categories.</p>
                    </div>
                    <a href="#shop" className="text-sm font-semibold text-gray-900 hover:underline">View all</a>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <CategoryCard
                        title="Electronics"
                        img="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
                    />
                    <CategoryCard
                        title="Fashion"
                        img="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
                    />
                    <CategoryCard
                        title="Home & Living"
                        img="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                    />
                    <CategoryCard
                        title="Beauty"
                        img="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                    />
                </div>
            </section>

            {/* Featured Products */}
            <section id="shop" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Picks</h2>
                        <p className="mt-1 text-sm text-gray-600">Handpicked items our customers love.</p>
                    </div>
                    <a href="#" className="text-sm font-semibold text-gray-900 hover:underline">Explore more</a>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <ProductCard
                        title="Wireless Headphones"
                        price="$129.00"
                        img="https://images.unsplash.com/photo-1518441902113-c1d3ee4bba32?q=80&w=1200&auto=format&fit=crop"
                    />
                    <ProductCard
                        title="Smart Watch"
                        price="$199.00"
                        img="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop"
                    />
                    <ProductCard
                        title="Minimal Chair"
                        price="$89.00"
                        img="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
                    />
                    <ProductCard
                        title="Leather Backpack"
                        price="$149.00"
                        img="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
                    />
                </div>
            </section>

            {/* Deals / Banner */}
            <section id="deals" className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-800 p-8 text-white sm:p-12">
                        <div className="absolute right-0 top-0 -z-0 opacity-20">
                            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="150" cy="150" r="120" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
                                <circle cx="150" cy="150" r="90" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
                                <circle cx="150" cy="150" r="60" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="relative z-10 grid gap-6 sm:grid-cols-2 sm:items-center">
                            <div>
                                <h3 className="text-2xl font-bold sm:text-3xl">Up to 50% off selected items</h3>
                                <p className="mt-2 text-sm text-gray-200">Limited-time offers across electronics, fashion, and more.</p>
                            </div>
                            <div className="sm:text-right">
                                <a href="#shop" className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">Grab Deals</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">What customers say</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Testimonial
                        quote="Fast delivery and the quality exceeded my expectations. Will shop again!"
                        author="Ariana"
                    />
                    <Testimonial
                        quote="Great prices and easy returns. The new arrivals section is my favorite."
                        author="James"
                    />
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="rounded-2xl border p-8 shadow-sm sm:p-10">
                    <div className="grid items-center gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Get 10% off your first order</h3>
                            <p className="mt-1 text-sm text-gray-600">Join our newsletter for exclusive deals and product updates.</p>
                        </div>
                        <form
                            className="flex w-full items-center gap-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // noop - integrate with backend/email service later
                            }}
                        >
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/90"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="about">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <div className="col-span-2 sm:col-span-1">
                            <div className="mb-3 inline-flex items-center gap-2">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white font-bold">CW</span>
                                <span className="text-lg font-semibold">CartWorld</span>
                            </div>
                            <p className="text-sm text-gray-600">Everything you need, delivered fast.</p>
                        </div>
                        <FooterCol title="Shop">
                            <a href="#shop">All Products</a>
                            <a href="#deals">Deals</a>
                            <a href="#categories">Categories</a>
                        </FooterCol>
                        <FooterCol title="Support">
                            <a href="#">Help Center</a>
                            <a href="#">Shipping</a>
                            <a href="#">Returns</a>
                        </FooterCol>
                        <FooterCol title="Company">
                            <a href="#about">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Contact</a>
                        </FooterCol>
                    </div>
                    <div className="mt-8 flex items-center justify-between pt-6 text-xs text-black">
                        <p>© {new Date().getFullYear()} CartWorld. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-black">Privacy</a>
                            <a href="#" className="hover:text-black">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

/* ========== Small UI building blocks ========== */
const CategoryCard = ({ title, img }) => (
    <a href="#shop" className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
        <img
            src={img}
            alt={`${title} category`}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                {title}
            </span>
        </div>
    </a>
);

const ProductCard = ({ title, price, img }) => (
    <a href="#" className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
            <img
                src={img}
                alt={title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
            />
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
            <div>
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">In stock</p>
            </div>
            <span className="shrink-0 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">{price}</span>
        </div>
    </a>
);

const Testimonial = ({ quote, author }) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-700">“{quote}”</p>
        <p className="mt-3 text-sm font-semibold text-gray-900">— {author}</p>
    </div>
);

const FooterCol = ({ title, children }) => (
    <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-900">{title}</h4>
        <nav className="flex flex-col gap-2 text-sm text-gray-600 [&_a:hover]:text-gray-900">
            {children}
        </nav>
    </div>
);

// Icons
const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
        <path d="M1.5 4.5A1.5 1.5 0 0 1 3 3h10.5v9H1.5V4.5Z" />
        <path d="M13.5 6H19l3 4.5V15a1.5 1.5 0 0 1-1.5 1.5h-.879a2.625 2.625 0 0 0-5.242 0H9.621a2.625 2.625 0 0 0-5.242 0H3A1.5 1.5 0 0 1 1.5 15v-1.5h12V6Z" />
        <path d="M6.75 18a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm12 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
        <path d="M12 2.25 3.75 5.25v6a10.5 10.5 0 0 0 8.25 10.221A10.5 10.5 0 0 0 20.25 11.25v-6L12 2.25Z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
        <path d="M4.5 4.5v4.125a.375.375 0 0 0 .375.375H9a.75.75 0 0 0 .53-1.28L7.28 5.25a7.5 7.5 0 1 1-2.03 9.72.75.75 0 1 0-1.29.76A9 9 0 1 0 7.5 3l1.72 1.72A.75.75 0 0 0 9 3.75H4.875A.375.375 0 0 0 4.5 4.125Z" />
    </svg>
);

const HeadsetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-900">
        <path d="M12 2.25a8.25 8.25 0 0 0-8.25 8.25v7.5A2.25 2.25 0 0 0 6 20.25h.75a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75H5.25v-1.5A6.75 6.75 0 1 1 18.75 12v1.5H16.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75H17a2.25 2.25 0 0 0 2.25-2.25V10.5A8.25 8.25 0 0 0 12 2.25Z" />
    </svg>
);

export default Home;