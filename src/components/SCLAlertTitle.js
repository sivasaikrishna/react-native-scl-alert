import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native'
import variables from '../config/variables'
import { cleanText } from '../helpers/text'

SCLAlertTitle.propTypes = {
  title: PropTypes.string,
  titleContainerStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style
}

SCLAlertTitle.defaultProps = {
  titleContainerStyle: {},
  titleStyle: {}
}

function SCLAlertTitle(props) {
  const title = cleanText(props.title)
  return (
    <Fragment>
      {!!title && (
        <View style={[styles.container, props.titleContainerStyle]}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.text, props.titleStyle]}>
            {title}
          </Text>
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: variables.gutter
  },
  text: {
    textAlign: 'center',
    fontSize: variables.largeFontSize,
    color: variables.textColor,
    fontWeight: '300'
  }
})

export default SCLAlertTitle
