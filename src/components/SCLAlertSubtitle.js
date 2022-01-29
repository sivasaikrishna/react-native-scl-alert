import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native'
import variables from '../config/variables'
import { cleanText } from '../helpers/text'

SCLAlertSubtitle.propTypes = {
  subtitle: PropTypes.string,
  subtitleContainerStyle: ViewPropTypes.style,
  subtitleStyle: Text.propTypes.style
}

SCLAlertSubtitle.defaultProps = {
  subtitleContainerStyle: {},
  subtitleStyle: {}
}

function SCLAlertSubtitle(props) {
  const subtitle = cleanText(props.subtitle)
  return (
    <Fragment>
      {!!subtitle && (
        <View style={[styles.container, props.subtitleContainerStyle]}>
          <Text
            numberOfLines={10}
            ellipsizeMode="tail"
            style={[styles.subtitle, props.subtitleStyle]}
          >
            {subtitle}
          </Text>
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: variables.mediumFontSize,
    color: variables.subtitleColor,
    fontWeight: '300'
  }
})

export default SCLAlertSubtitle
