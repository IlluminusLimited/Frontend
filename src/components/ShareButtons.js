import React, {Component} from 'react';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    EmailShareButton,
} from 'react-share';
import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    GooglePlusIcon,
    PinterestIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
} from 'react-share';

class ShareButtons extends Component {
    render() {
        return (
            <div className='share-button-container'>
                    <FacebookShareButton
                        url={'asdf'}
                        quote={'asdf'}
                        className="share-button-container share-button">
                        <FacebookIcon
                            size={32} />
                    </FacebookShareButton>


                <TwitterShareButton
                    url={'shareUrl'}
                    title='title'
                    className="share-button">
                    <TwitterIcon
                        size={32}
                         />
                </TwitterShareButton>

                <GooglePlusShareButton
                    url={'shareUrl'}
                    className="share-button">
                    <GooglePlusIcon
                        size={32}
                         />
                </GooglePlusShareButton>
                <PinterestShareButton
                    url={String(window.location)}
                    media={`${String(window.location)}/${'asdf'}`}
                    windowWidth={1000}
                    windowHeight={730}
                    className="share-button">
                    <PinterestIcon size={32}  />
                </PinterestShareButton>

                <RedditShareButton
                    url={'shareUrl'}
                    title='title'
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button">
                    <RedditIcon
                        size={32}
                         />
                </RedditShareButton>
                <TumblrShareButton
                    url={'shareUrl'}
                    title='title'
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button">
                    <TumblrIcon
                        size={32}
                         />
                </TumblrShareButton>
                <WhatsappShareButton
                    url={'shareUrl'}
                    title='title'
                    separator=":: "
                    className="share-button">
                    <WhatsappIcon size={32}  />
                </WhatsappShareButton>
                <EmailShareButton
                    url={'shareUrl'}
                    subject='title'
                    body="body"
                    className="share-button">
                    <EmailIcon
                        size={32}
                         />
                </EmailShareButton>
            </div>
        );
    }
}

export default ShareButtons;
