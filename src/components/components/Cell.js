import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { ArrowSpots, SafeSpots, StarSpots, TurningPoints } from '../../helpers/PlotData'
import { COLORS } from '../../enums/StyleGuides'
import { ArrowRightIcon, StarIcon } from 'react-native-heroicons/outline'

const Cell = (props) => {

    const { cellData, color } = props

    const isSafeSpots = useMemo(() => SafeSpots.includes(cellData), [cellData])
    const isStarSpots = useMemo(() => StarSpots.includes(cellData), [cellData])
    const isArrowSpots = useMemo(() => ArrowSpots.includes(cellData), [cellData])
    const isTurningSpots = useMemo(() => TurningPoints.includes(cellData), [cellData])

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
                !isArrowSpots && !isStarSpots &&
                <Text>{cellData}</Text>
            }

        </View>
    )
}

export default Cell

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        borderWidth: 0.2,
        borderColor: COLORS.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    }
})