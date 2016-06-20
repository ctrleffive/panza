import React, { PropTypes } from 'react'
import {
  Base,
  InputExpandable,
  TouchableInput
} from '../index'
import {
  Platform,
  View,
  Text,
  Dimensions,
  DatePickerIOS,
  DatePickerAndroid,
  StyleSheet
} from 'react-native'

const screen = Dimensions.get('window')

/**
 * InputDatePicker a cross-platform InputRow inputting
 * dates.
 *
 * On iOS devices, the row examples to reveal
 * DatePickerIOS when selected. The humanized date should
 * be supplied as the value prop, and it should be
 * updated when the value of the date-picker changes.
 *
 * On Anroid, the date-picker prompts the user to select
 * a date in a modal menu.
 *
 */

class InputDatePicker extends React.Component {

  static displayName = 'InputDatePicker'

  static propTypes = {
    expanded: PropTypes.bool.isRequired,

    /** function called to toggle the visibility of the date-picker. (iOS only) **/
    onToggleExpansion: PropTypes.func.isRequired,

    /** the currently selected date to be displayed in collapsed row. **/
    value: PropTypes.string,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    label: PropTypes.string,
    mode: PropTypes.string,
    date: PropTypes.object.isRequired,
    onDateChange: PropTypes.func.isRequired,
    editable: PropTypes.bool
  }

  static defaultProps = {
    editable: true
  }

  render() {

    const {
      expanded,
      onToggleExpansion,
      label,
      value,
      editable,
      ...other
    } = this.props

    const Row = (
      <TouchableInput
        label={label}
        value={value}
        onPress={() => {
          if (Platform.OS === 'ios') {
            return onToggleExpansion()
          } else if (Platform.OS === 'android') {
            this.toggleDatePicker()
          }
        }}
        disabled={!editable}
        {...other}
      />
    )

    return (
      <InputExpandable
        expanded={Platform.OS === 'ios' ? expanded : false}
        Row={Row}>
          {Platform.OS === 'ios' && this.renderIOS() }
      </InputExpandable>
    )
  }

  renderIOS() {
    return (
      <View
        style={styles.pickerWrapper}>
        <DatePickerIOS
          date={new Date(this.props.date)}
          maximumDate={this.props.maxDate}
          minimumDate={this.props.minDate}
          mode={this.props.mode}
          onDateChange={(date) => {
            this.props.onDateChange(date)
          }}
        />
      </View>
    )
  }


  toggleDatePicker() {
    if (Platform.OS === 'android') {

        const opts = {
          date: this.props.date,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate
        }

        DatePickerAndroid.open()
          .then(({ action, year, month, day }) => {
            if (action === DatePickerAndroid.dismissedAction) {
              console.log('dismissed')
            } else {
              this.props.onDateChange(new Date(year, month, day))
            }
          })
          .catch(err => {
            onsole.warn('error opening date picker', code, message)
          })

      
    }
  }

}

const styles = StyleSheet.create({

})

export default InputDatePicker
