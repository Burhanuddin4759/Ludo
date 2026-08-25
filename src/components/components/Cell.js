import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { ArrowSpots, SafeSpots, StarSpots, TurningPoints } from '../../helpers/PlotData'
import { COLORS } from '../../enums/StyleGuides'
import { ArrowRightIcon, StarIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPositions } from '../../redux/reducers/gameSelector'
import Pile from '../../screens/ludoboard/components/child/Pile'
import { handleForwardThunk } from '../../redux/reducers/gameAction'

const Cell = (props) => {

    const { id, color } = props
    const plottedPieces = useSelector(selectCurrentPositions)

    const dispatch = useDispatch()

    const isSafeSpots = useMemo(() => SafeSpots.includes(id), [id])
    const isStarSpots = useMemo(() => StarSpots.includes(id), [id])
    const isArrowSpots = useMemo(() => ArrowSpots.includes(id), [id])
    const isTurningSpots = useMemo(() => TurningPoints.includes(id), [id])

    const piecesAtPosition = useMemo(() =>
        plottedPieces.filter(item => item.pos == id),
        [plottedPieces, id]
    )

    const handlePress = useCallback(
        (playerNo, pieceId) => {
            dispatch(handleForwardThunk(playerNo, pieceId, id))
        }, [dispatch, id])

    return (
        <View style={[styles.cell,
        {
            backgroundColor:
                isSafeSpots
                    ? color : isStarSpots
                    && 'rgba(0,0,0,0.15)'
        }
        ]}>

            {isStarSpots && <StarIcon size={20} color={'grey'} />}
            {isArrowSpots &&
                <ArrowRightIcon
                    style={{ transform: [{ rotate: color == COLORS.YELLOW ? '90deg' : color == COLORS.BLUE ? '180deg' : color == COLORS.RED ? '-90deg' : '0deg' }] }}
                    size={20}
                    color={'grey'}
                />}

            {
                piecesAtPosition.map((piece, index) => {
                    const playerNo =
                        piece.id.slice(0, 1) === 'A'
                            ? 1
                            : piece.id.slice(0, 1) === 'B'
                                ? 2
                                : piece.id.slice(0, 1) === 'C'
                                    ? 3
                                    : 4

                    const pieceColor =
                        piece.id.slice(0, 1) === 'A'
                            ? COLORS.RED
                            : piece.id.slice(0, 1) === 'B'
                                ? COLORS.GREEN
                                : piece.id.slice(0, 1) === 'C'
                                    ? COLORS.YELLOW
                                    : COLORS.BLUE

                    return (
                        <View
                            key={piece.id}
                            style={[styles.pieceContainer, {
                                transform: [
                                    { scale: piecesAtPosition.length === 1 ? 1 : 0.7 },
                                    { translateX: piecesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6 },
                                    { translateY: piecesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6 }
                                ]
                            }]}
                        >
                            <Pile
                                cell={true}
                                player={playerNo}
                                onPress={() => handlePress(playerNo, piece.id)}
                                pieceId={piece.id}
                                color={pieceColor}
                            />
                        </View>
                    )
                })
            }
            {
                !isArrowSpots && !isStarSpots &&
                <Text>{id}</Text>
            }

        </View>
    )
}

export default React.memo(Cell)

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        borderWidth: 0.2,
        borderColor: COLORS.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pieceContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 99
    }
})