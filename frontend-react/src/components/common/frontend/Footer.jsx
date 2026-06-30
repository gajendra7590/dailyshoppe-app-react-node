import { Link } from 'react-router'

export default function Footer() {

    const socialLinks = {
        facebook: "https://www.facebook.com/your-page",
        instagram: "https://www.instagram.com/your-profile",
    };

    return (
        <footer className="bg-slate-900 text-white mt-10">

            <div className="container mx-auto px-4 py-10">

                <div className="grid md:grid-cols-4 gap-8">

                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            {import.meta.env.VITE_APP_NAME}
                        </h3>

                        <p>
                            Best online shopping platform.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Company
                        </h3>

                        <ul className="space-y-2">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Support
                        </h3>

                        <ul className="space-y-2">
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/help-center">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Follow Us
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </footer>
    )
}
