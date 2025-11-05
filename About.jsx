import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const About = () => {
    return (
        <section className="about-section">
            <div className="head">
                <h1 className="about-head">Foodvilla Store</h1>
            </div>

            <div className="about-content">
                <p>
                    Welcome to <strong>Foodvilla  Store</strong> – your one-stop
                    destination for fresh ingredients, authentic flavors, and ready-to-cook
                    recipes! We believe that food is more than just a necessity – it’s an
                    experience that brings people together.
                </p>

                <p>
                    At Foodvilla, we carefully source high-quality ingredients and curate
                    delicious recipes from around the world. Whether you’re craving
                    traditional comfort food, exploring international cuisines, or just
                    looking for quick and healthy options, we’ve got you covered.
                </p>

                <p>
                    Our mission is simple: <em>to make cooking fun, easy, and accessible
                        for everyone</em>. That’s why we offer not only fresh groceries but also
                    step-by-step recipe guides, so you can prepare restaurant-style dishes
                    right at home.
                </p>

                <p>
                    Thank you for choosing <strong>Foodvilla  Store</strong>. Let’s
                    cook, share, and celebrate food together! 🍴
                </p>



                <div className="about-btn">
                    <p>
                        Feel free to look into our products
                    </p>
                    <Link to="/" className="btn-link">Here</Link>
                </div>
            </div>
        </section>
    )
};

export default About;