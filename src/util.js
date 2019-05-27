import PropTypes from 'prop-types'

const util = {

    sortDescending(_array) {
        const array = [ ..._array ]
        return array.sort((a, b) => {
            if (a > b) {
                return -1
            }
            if (b > a) {
                return 1
            }
            return 0
        })
    },

    commandsToSvgPath(commands) {
        return commands
            .map(command => `${command.marker} ${command.values.join(',')}`)
            .join(' ')
            .trim()
    },
    coordinatesToPathCommands(
        x0,
        y0,
        x1,
        y1,
        borderRadius,
        showTopBorder,
        showBottomBorder
    ) {
        const commands = []
        commands.push({ marker: 'M', values: [ x0, y0 ] })

        if (showTopBorder) {
            const topLeft1 = [ x0 + borderRadius, y0 ]
            const topLeft2 = [ x0, y0 + borderRadius ]
            commands.push({ marker: 'L', values: topLeft1 })
            commands.push({
                marker: 'C',
                values: [ ...topLeft1, x0, y0, ...topLeft2 ],
            })
            commands.push({ marker: 'L', values: topLeft2 })
        } else {
            commands.push({ marker: 'L', values: [ x0, y0 ] })
        }

        if (showBottomBorder) {
            const bottomLeft1 = [ x0, y1 - borderRadius ]
            const bottomLeft2 = [ x0 + borderRadius, y1 ]
            commands.push({ marker: 'L', values: bottomLeft1 })
            commands.push({
                marker: 'C',
                values: [ ...bottomLeft1, x0, y1, ...bottomLeft2 ],
            })
            commands.push({ marker: 'L', values: bottomLeft2 })
            const bottomRight1 = [ x1 - borderRadius, y1 ]
            const bottomRight2 = [ x1, y1 - borderRadius ]
            commands.push({ marker: 'L', values: bottomRight1 })
            commands.push({
                marker: 'C',
                values: [ ...bottomRight1, x1, y1, ...bottomRight2 ],
            })
            commands.push({ marker: 'L', values: bottomRight2 })
        } else {
            commands.push({ marker: 'L', values: [ x0, y1 ] })
            commands.push({ marker: 'L', values: [ x1, y1 ] })
        }

        if (showTopBorder) {
            const topRight1 = [ x1, y0 + borderRadius ]
            const topRight2 = [ x1 - borderRadius, y0 ]
            commands.push({ marker: 'L', values: topRight1 })
            commands.push({
                marker: 'C',
                values: [ ...topRight1, x1, y0, ...topRight2 ],
            })
            commands.push({ marker: 'L', values: topRight2 })
        } else {
            commands.push({ marker: 'L', values: [ x1, y0 ] })
        }

        commands.push({ marker: 'Z', values: [] })

        return commands
    },

}

export const Constants = {
    gridStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    commonProps: {
        svg: PropTypes.object,
        shadowSvg: PropTypes.object,
        shadowWidth: PropTypes.number,
        shadowOffset: PropTypes.number,

        style: PropTypes.any,

        animate: PropTypes.bool,
        animationDuration: PropTypes.number,

        curve: PropTypes.func,
        contentInset: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
        }),
        numberOfTicks: PropTypes.number,

        renderGradient: PropTypes.func,

        gridMin: PropTypes.number,
        gridMax: PropTypes.number,
        showGrid: PropTypes.bool,
        gridProps: PropTypes.object,
    },
    commonDefaultProps: {
        strokeColor: '#22B6B0',
        strokeWidth: 2,
        contentInset: {},
        numberOfTicks: 10,
        showGrid: true,
        gridMin: 0,
        gridMax: 0,
        gridStroke: 'rgba(0,0,0,0.2)',
        gridWidth: 0.5,
    },
}

export default util
