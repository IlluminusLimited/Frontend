import React, {Component} from 'react';
import HeaderNav from './HeaderNav';

class Legal extends Component {
    render() {
        return (
            <React.Fragment>
                <HeaderNav history={this.props.history} label='Legal' modal={false}/>

                <main className="container">
                    <section className="grid col-100">
                        <h1 className="copy-turquoise">Pinster</h1>
                        <p>Your information will not be shared with external entities.</p>

                        <ul className="no-style">
                            <li><a href="#TermsAndConditions">Terms and Conditions</a></li>
                            <li><a href="#PrivacyPolicy">Privacy Policy</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 id="TermsAndConditions" className="h3-size copy-turquoise with-divider">Terms of Service and Privacy Policy</h2>

                        <h3 className="copy-purple h4-size">1. Terms</h3>
                        <p>
                            By accessing the website at <a href="https://app-prod.pinster.io">app-prod.pinster.io</a> and/or
                            <a href="https://api-prod.pinster.io">api-prod.pinster.io</a>, you are agreeing to be
                            bound by these terms of service, all applicable laws and regulations, and agree that you are responsible
                            for compliance with any applicable local laws. If you do not agree with any of these terms, you are
                            prohibited from using or accessing this site. The materials contained in this website are protected by
                            applicable copyright and trademark law.
                        </p>

                        <h3 className="h4-size copy-purple">2. Disclaimer</h3>
                        <ol type="a">
                            <li>
                                The materials on Pinster's website are provided on an 'as is' basis. Pinster makes no warranties,
                                expressed or implied, and hereby disclaims and negates all other warranties including, without
                                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                                non-infringement of intellectual property or other violation of rights.
                            </li>
                            <li>
                                Further, Pinster does not warrant or make any representations concerning the accuracy, likely results,
                                or reliability of the use of the materials on its website or otherwise relating to such
                                materials or on any sites linked to this site.
                            </li>
                        </ol>

                        <h3 className="h4-size copy-purple">3. Limitations</h3>
                        <p>
                            In no event shall Pinster or its suppliers be liable for any damages (including, without limitation, damages
                            for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
                            materials on Pinster's website, even if Pinster or a Pinster authorized representative has been notified orally
                            or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied
                            warranties, or limitations of liability for consequential or incidental damages, these limitations may not
                            apply to you.
                        </p>

                        <h3 className="h4-size copy-purple">4. Accuracy of materials</h3>
                        <p>
                            The materials appearing on Pinster's website could include technical, typographical, or photographic errors.
                            Pinster does not warrant that any of the materials on its website are accurate, complete or current. Pinster
                            may make changes to the materials contained on its website at any time without notice. However Pinster does
                            not make any commitment to update the materials.
                        </p>

                        <h3 className="h4-size copy-purple">5. Modifications</h3>
                        <p>
                            Pinster may revise these terms of service for its website at any time without notice. By using this website
                            you are agreeing to be bound by the then current version of these terms of service.
                        </p>

                        <h3 className="h4-size copy-purple">6. Governing Law</h3>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of Indiana and you
                            irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>

                    <section>
                        <h2 id="PrivacyPolicy" className="h3-size copy-turquoise with-divider">Privacy Policy</h2>

                        <p>Your privacy is important to us.</p>

                        <p>
                            It is Pinster's policy to respect your privacy regarding any information we may collect
                            while operating our website.  Accordingly, we have developed this privacy policy in order
                            for you to understand how we collect, use, communicate, disclose and otherwise make use
                            of personal information. We have outlined our privacy policy below.
                        </p>

                        <ul>
                            <li>
                                We will collect personal information by lawful and fair means and, where appropriate, with the
                                knowledge or consent of the individual concerned.
                            </li>
                            <li>
                                Before or at the time of collecting personal information, we will identify the purposes for
                                which information is being collected.
                            </li>
                            <li>
                                We will collect and use personal information solely for fulfilling those purposes specified by
                                us and for other ancillary purposes, unless we obtain the consent of the individual concerned
                                or as required by law.
                            </li>
                            <li>
                                Personal data should be relevant to the purposes for which it is to be used, and, to the extent
                                necessary for those purposes, should be accurate, complete, and up-to-date.
                            </li>
                            <li>
                                We will protect personal information by using reasonable security safeguards against loss or
                                theft, as well as unauthorized access, disclosure, copying, use or modification.
                            </li>
                            <li>
                                We will make readily available to customers information about our policies and practices relating
                                to the management of personal information.
                            </li>
                            <li>
                                We will only retain personal information for as long as necessary for the fulfilment of those purposes.
                            </li>
                        </ul>

                        <p>
                            We are committed to conducting our business in accordance with these principles in order to ensure
                            that the confidentiality of personal information is protected and maintained.  Pinster may change
                            this privacy policy from time to time at Pinster's sole discretion.
                        </p>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}

export default Legal;
