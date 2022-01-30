import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Modal,
  View,
  ViewPropTypes,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { SCLAlertHeader, SCLAlertTitle, SCLAlertSubtitle } from '../components'
import { height } from '../helpers/dimensions'
import variables from './../config/variables'

class SCLAlert extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    cancellable: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    slideAnimationDuration: PropTypes.number,
    overlayStyle: ViewPropTypes.style,
    useNativeDriver: PropTypes.bool,
    showHeader: PropTypes.bool
  }

  static defaultProps = {
    children: null,
    show: false,
    cancellable: true,
    slideAnimationDuration: 250,
    overlayStyle: {},
    useNativeDriver: true,
    showHeader: true
  }

  state = {
    show: false
  }

  slideAnimation = new Animated.Value(0)

  componentDidMount() {
    this.props.show && this.show()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== this.state.show) {
      return this[this.props.show ? 'show' : 'hide']()
    }
  }

  /**
   * @description get animation interpolation
   * @return { Array }
   */
  get interpolationTranslate() {
    const move = this.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    })

    return [{ translateY: move }]
  }

  /**
   * @description show modal
   * @return { Void }
   */
  show = () => {
    this._runAnimationAsync()
    this.setState({ show: true })
  }

  /**
   * @description hide modal
   * @return { Void }
   */
  hide = async () => {
    await this._runAnimationAsync()
    this.setState({ show: false })
  }

  /**
   * @description run slide animation to show action sheet contetn
   * @param { Boolean } show - Show / Hide content
   * @return { Promise }
   */
  _runAnimationAsync = () => {
    return new Promise(resolve => {
      const options = {
        toValue: this.state.show ? 0 : 1,
        duration: this.props.slideAnimationDuration,
        animation: variables.translateEasing,
        useNativeDriver: this.props.useNativeDriver
      }

      Animated.timing(this.slideAnimation, options).start(resolve)
    })
  }

  /**
   * @description callback after press in the overlay
   * @return { Void }
   */
  handleOnClose = () => {
    this.props.cancellable && this.props.onRequestClose()
  }

  render() {
    const { showHeader } = this.props
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.show}
        onRequestClose={this.handleOnClose}
      >
        <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={this.handleOnClose}>
            <View style={[styles.overlay, this.props.overlayStyle]} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[styles.contentContainer, { transform: this.interpolationTranslate }]}
          >
            <View style={styles.innerContent}>
              {showHeader && <SCLAlertHeader {...this.props} />}
              <SCLAlertTitle {...this.props} />
              <SCLAlertSubtitle {...this.props} />
              <View style={styles.bodyContainer}>{this.props.children}</View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  inner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: variables.containerPadding
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: variables.overlayBackgroundColor,
    justifyContent: 'center',
    zIndex: 100
  },
  contentContainer: {
    flex: 1,
    zIndex: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },
  innerContent: {
    padding: variables.gutter,
    borderRadius: variables.baseBorderRadius,
    backgroundColor: variables.baseBackgroundColor,
    width: variables.contentWidth
  },
  bodyContainer: {
    justifyContent: 'flex-end'
  }
})

export default SCLAlert
