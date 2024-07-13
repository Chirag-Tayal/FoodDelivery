import styles from '../styles/about.module.css'; // Import your CSS file
import image1 from '../assets/service.svg';

const About = () => {
    return (
        <div className={styles.main}>
            <section>
                <h1>About us</h1>
                <h2>Delight in Every Bite: Your Culinary Journey Begins at TasteHarbor</h2>
                <p>Welcome to TasteHarbor, your gateway to a world of culinary delights! Whether
                    you are craving the comforting classics or seeking the thrill of bold new
                    tastes, TasteHarbor is your destination for an unforgettable culinary adventure.</p>
                <p>TasteHarbor - Where Taste Meets Convenience, and Every Bite is an Experience!</p>
            </section>

            <section className={styles.imagesSection}>
                <img src={image1} alt="Image 1"/>
                <p>Embark on a journey through a myriad of culinary services that redefine the
                    art of dining. At TasteHarbor, our commitment to excellence is reflected in the
                    diverse range of offerings on our Services page. From seamless online ordering
                    to personalized dining experiences, we curate a spectrum of services that cater
                    to every palate and preference. Explore the array of services designed to
                    elevate your culinary adventures and make each dining moment exceptional.
                    Discover a world where convenience meets culinary delight, and let us redefine
                    the way you experience food. Welcome to Our Culinary Spectrum – where every
                    service is crafted to satiate your appetite for extraordinary dining.</p>
            </section>
        </div>
    );
};

export default About;