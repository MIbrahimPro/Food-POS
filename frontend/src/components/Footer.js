import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [popuptype, setPopuptype] = useState('');

    const openPopup = (type) => {
        setPopuptype(type);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setPopuptype('');
    };

    const handleClickOutside = (e) => {
        if (e.target.classList.contains('popup-overlay')) {
            closePopup();
        }
    };

    return (
        <>
            <footer className="Footer">
                <div>
                    <img src="/logo.png" alt="logo" />
                    Restaurant Copyright © 2024. All Rights Reserved.
                </div>
                <div>
                    <span className="footer-link" onClick={() => openPopup("1")}>
                        TERMS & CONDITIONS
                    </span>
                    |
                    <span className="footer-link" onClick={() => openPopup("2")}>
                        PRIVACY POLICY
                    </span>
                </div>
            </footer>

            {isOpen && (
                <div className="footer-popup-overlay" onClick={closePopup}>
                    <div className="footer-popup">
                        {popuptype === "1" ? (
                            <div>
                                <div className="footer-popup-heading">
                                    <button className="footer-popup-close-btn" onClick={closePopup}>&times;</button>
                                    <div>
                                        <h2>Your Safety</h2>
                                        <p>Who do we sell your data to?</p>
                                    </div>
                                    <div className="popup-divider"></div>
                                </div>
                                <h2>Safety Policy</h2>
                                <p>Dont act like your information is worth millions, we tried selling your information, there was no one to buy it, who would even buy your information, who wants to know you have 2$ in your bank account?</p>
                                <br />
                                <h3>Introduction</h3>
                                <p>
                                    Welcome to our website! Your privacy is critically important to us, and we are committed to protecting your personal information. This Privacy Policy outlines the types of data we collect, how we use it, and the measures we take to safeguard your information.
                                </p>
                                <br />
                                <h3>Information We Collect</h3>
                                <p>
                                    We collect a variety of information from users, including but not limited to:
                                    <ul>
                                        <li>Personal Identification Information (Name, email address, phone number, etc.)</li>
                                        <li>Usage Data (IP address, browser type, pages visited, etc.)</li>
                                        <li>Cookies and Tracking Data to improve user experience</li>
                                    </ul>
                                </p>
                                <br />
                                <h3>How We Use Your Information</h3>
                                <p>
                                    The data we collect is used to enhance your experience, such as:
                                    <ul>
                                        <li>Providing and maintaining our service</li>
                                        <li>Notifying you of changes or updates</li>
                                        <li>Offering personalized content and advertisements</li>
                                    </ul>
                                    We do not sell or rent your personal information to third parties.
                                </p>

                                <br />
                                <h3>Your Rights</h3>
                                <p>
                                    You have the right to access, update, or delete any of your personal data. You may also opt out of data collection and the use of cookies by adjusting your browser settings or contacting us directly.
                                </p>

                                <br />
                                <h3>Security</h3>
                                <p>
                                    We take data security seriously and implement a range of measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute protection.
                                </p>

                                <br />
                                <h3>Changes to This Policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. You will be notified of any significant changes via email or by a notice on our website.
                                </p>

                                <br />
                                <h3>Contact Us</h3>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at privacy@yourwebsite.com.
                                </p>
                                <br />
                                <h3>Data Retention and Compliance</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>

                                <br />
                                <h3>Third-Party Links</h3>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                                </p>

                                <br />
                                <h3>Cookie Policy</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque justo at eros ultrices, vel pharetra neque semper. Sed euismod nunc nec nisi dignissim, in vehicula mauris tincidunt. Vivamus volutpat efficitur dapibus. Nulla facilisi.
                                </p>

                                <br />
                                <h3>Data Transfers</h3>
                                <p>
                                    Aliquam erat volutpat. Sed sit amet vehicula nibh, et tempus erat. Integer a mauris ac erat commodo interdum non in felis. Nam sit amet vulputate augue, sed ullamcorper lorem. Nulla nec ultricies enim. Vestibulum nec turpis nisl.
                                </p>

                                <br />
                                <h3>Data Minimization</h3>
                                <p>
                                    Morbi lobortis est nec ultricies blandit. Curabitur pharetra tellus eu nunc venenatis tempus. Sed consequat felis ac malesuada eleifend. In rutrum, nisl sit amet ullamcorper pretium, lacus arcu vestibulum lorem, sit amet dapibus ligula turpis at libero.
                                </p>
                                <div className="popup-divider"></div>
                                <h3>Contact Us</h3>
                                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                                <p>Email: <a href="mailto:muhammadibrahimtbt@gmail.com">muhammadibrahimtbt@gmail.com</a></p>
                                <p>Phone: <a href="tel:+923197877750">+92-319-787-7750</a></p>
                            </div>
                        ) : (
                            <div>
                                <div className="footer-popup-heading">
                                    <button className="footer-popup-close-btn" onClick={closePopup}>&times;</button>
                                    <div>
                                        <h2>Privacy Policy</h2>
                                        <p>Do people actually think we care?</p>
                                    </div>
                                    <div className="popup-divider"></div>
                                </div>
                                <h2>Privacy Policy</h2>

                                <h3>Introduction</h3>
                                <p>
                                    Welcome to our website! Your privacy is critically important to us, and we are committed to protecting your personal information. This Privacy Policy outlines the types of data we collect, how we use it, and the measures we take to safeguard your information.
                                </p>

                                <br />
                                <h3>Information We Collect</h3>
                                <p>
                                    We collect a variety of information from users, including but not limited to:
                                    <ul>
                                        <li>Personal Identification Information (Name, email address, phone number, etc.)</li>
                                        <li>Usage Data (IP address, browser type, pages visited, etc.)</li>
                                        <li>Cookies and Tracking Data to improve user experience</li>
                                    </ul>
                                </p>

                                <br />
                                <h3>How We Use Your Information</h3>
                                <p>
                                    The data we collect is used to enhance your experience, such as:
                                    <ul>
                                        <li>Providing and maintaining our service</li>
                                        <li>Notifying you of changes or updates</li>
                                        <li>Offering personalized content and advertisements</li>
                                    </ul>
                                    We do not sell or rent your personal information to third parties.
                                </p>

                                <br />
                                <h3>Your Rights</h3>
                                <p>
                                    You have the right to access, update, or delete any of your personal data. You may also opt out of data collection and the use of cookies by adjusting your browser settings or contacting us directly.
                                </p>

                                <br />
                                <h3>Security</h3>
                                <p>
                                    We take data security seriously and implement a range of measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute protection.
                                </p>

                                <br />
                                <h3>Changes to This Policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. You will be notified of any significant changes via email or by a notice on our website.
                                </p>

                                <br />
                                <h3>Contact Us</h3>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at privacy@yourwebsite.com.
                                </p>

                                <br />
                                <h3>Data Retention and Compliance</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>

                                <br />
                                <h3>Third-Party Links</h3>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                                </p>

                                <br />
                                <h3>Cookie Policy</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque justo at eros ultrices, vel pharetra neque semper. Sed euismod nunc nec nisi dignissim, in vehicula mauris tincidunt. Vivamus volutpat efficitur dapibus. Nulla facilisi.
                                </p>

                                <br />
                                <h3>Data Transfers</h3>
                                <p>
                                    Aliquam erat volutpat. Sed sit amet vehicula nibh, et tempus erat. Integer a mauris ac erat commodo interdum non in felis. Nam sit amet vulputate augue, sed ullamcorper lorem. Nulla nec ultricies enim. Vestibulum nec turpis nisl.
                                </p>

                                <br />
                                <h3>Data Minimization</h3>
                                <p>
                                    Morbi lobortis est nec ultricies blandit. Curabitur pharetra tellus eu nunc venenatis tempus. Sed consequat felis ac malesuada eleifend. In rutrum, nisl sit amet ullamcorper pretium, lacus arcu vestibulum lorem, sit amet dapibus ligula turpis at libero.
                                </p>

                                <br />
                                <h3>Contact Us</h3>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at privacy@yourwebsite.com.
                                </p>

                                <br />
                                <h3>Data Retention and Compliance</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>

                                <br />
                                <h3>Third-Party Links</h3>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                                </p>

                                <br />
                                <h3>Cookie Policy</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque justo at eros ultrices, vel pharetra neque semper. Sed euismod nunc nec nisi dignissim, in vehicula mauris tincidunt. Vivamus volutpat efficitur dapibus. Nulla facilisi.
                                </p>

                                <br />
                                <h3>Data Transfers</h3>
                                <p>
                                    Aliquam erat volutpat. Sed sit amet vehicula nibh, et tempus erat. Integer a mauris ac erat commodo interdum non in felis. Nam sit amet vulputate augue, sed ullamcorper lorem. Nulla nec ultricies enim. Vestibulum nec turpis nisl.
                                </p>

                                <br />
                                <h3>Data Minimization</h3>
                                <p>
                                    Morbi lobortis est nec ultricies blandit. Curabitur pharetra tellus eu nunc venenatis tempus. Sed consequat felis ac malesuada eleifend. In rutrum, nisl sit amet ullamcorper pretium, lacus arcu vestibulum lorem, sit amet dapibus ligula turpis at libero.
                                </p>
                                <div className="popup-divider"></div>
                                <h3>Contact Us</h3>
                                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                                <p>Email: <a href="mailto:muhammadibrahimtbt@gmail.com">muhammadibrahimtbt@gmail.com</a></p>
                                <p>Phone: <a href="tel:+923197877750">+92-319-787-7750</a></p>

                            </div>
                        )}
                    </div>
                </div >
            )}
        </>
    );
};

export default Footer;
