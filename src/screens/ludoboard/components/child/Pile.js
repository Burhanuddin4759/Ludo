import { Animated, Easing, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { COLORS } from '../../../../enums/StyleGuides';
import { useSelector } from 'react-redux';
import { selectCellSelection, selectDiceNumber, selectPocketPileSelection } from '../../../../redux/reducers/gameSelector';
import PileGreen from '../../../../assets/images/piles/green.png'
import PileBlue from '../../../../assets/images/piles/blue.png'
import PileRed from '../../../../assets/images/piles/red.png'
import PileYellow from '../../../../assets/images/piles/yellow.png'


const Pile = (props) => {
    const { color, player, onPress, pieceId, cell } = props;

    const rotation = useRef(new Animated.Value(0)).current
    const currentPlayerPileSelection = useSelector(selectPocketPileSelection)
    const currentPlayerCellSelection = useSelector(selectCellSelection)
    const diceNo = useSelector(selectDiceNumber)
    const playerPieces = useSelector(state => state.game[`player${player}`])

    const isPileEnabled = useMemo(() => player === currentPlayerPileSelection, [player, currentPlayerPileSelection])
    const isCellEnabled = useMemo(() => player === currentPlayerCellSelection, [player, currentPlayerCellSelection])

    const isForwardable = useCallback(() => {
        const piece = playerPieces?.find(item => item.id === pieceId)
        return piece && piece.travelCount + diceNo <= 57
    }, [playerPieces, pieceId, diceNo])


    // Define the pile source based on the color prop
    const getPileImage = useMemo(() => {
        switch (color) {
            case COLORS.BLUE:
                return PileBlue;
            case COLORS.GREEN:
                return PileGreen;
            case COLORS.YELLOW:
                return PileYellow;
            case COLORS.RED:
                return PileRed;
            default:
                return null;
        }
    }, [color]);


    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        )
        rotateAnimation.start()
        return () => rotateAnimation.stop()
    }, [])

    const rotateWhite = useMemo(() => rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    }), [rotation])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}
            style={styles.pile}>
            {
                (cell ? isCellEnabled && isForwardable() : isPileEnabled) &&
                <Animated.View
                    style={[styles.animated, { borderColor: cell ? '#666' : '#fff' },
                    { transform: [{ rotate: rotateWhite }] }
                    ]}
                />
            }

            <Image
                source={getPileImage}
                style={styles.pileImg}
            />

        </TouchableOpacity>
    );
};

export default memo(Pile);

const styles = StyleSheet.create({
    pile: {
        flex: 1,
        // position: 'absolute',
        top: '-50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pileImg: {
        height: 30,
        width: 30,
    },
    animated: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: 'dashed',
        // borderColor: '#f5f5f5',
        position: 'absolute',
        top: '60%',

    }
});
