import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../enums/StyleGuides';

const Pile = (props) => {
    const { color } = props;

    // Define the pile source based on the color prop
    const getImageSource = () => {
        switch (color) {
            case COLORS.BLUE:
                return require('../../../../assets/images/piles/blue.png');
            case COLORS.GREEN:
                return require('../../../../assets/images/piles/green.png');
            case COLORS.YELLOW:
                return require('../../../../assets/images/piles/yellow.png');
            case COLORS.RED:
                return require('../../../../assets/images/piles/red.png');
            default:
                return null;
        }
    };

    return (
        <TouchableOpacity style={styles.pile}>
            <Image
                source={getImageSource()}
                style={styles.pileImg}
            />
        </TouchableOpacity>
    );
};

export default Pile;

const styles = StyleSheet.create({
    pile: {
        flex: 1,
        position: 'absolute',
        top: '-50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pileImg: {
        height: 30,
        width: 30,
    },
});
