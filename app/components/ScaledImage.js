import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

class ScaledImage extends Component {
    constructor(props) {
        super(props);
        let { source } = this.props;
        this.state = { imgSource: source };
    }

    componentWillMount() {
        let { source } = this.props;

        Image.getSize(source.uri, (width, height) => {
            let h, w;
            if (this.props.width && !this.props.height) {
                w = this.props.width;
                h = height * (this.props.width / width);
            } else if (!this.props.width && this.props.height) {
                w = width * (this.props.height / height);
                h = this.props.height;
            } else {
                w = width;
                h = height;
            }

            this.setState({width: w, height: h});
        });
    }

    render() {
        return (
            <Image source={this.state.imgSource} style={[this.props.style, { height: this.state.height, width: this.state.width }]}>
                {this.props.children}
            </Image>
        )
    }
}

ScaledImage.propTypes = {
    source: PropTypes.any.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

ScaledImage.defaultProps = {
    width: 0,
    height: 0
};

export default ScaledImage;