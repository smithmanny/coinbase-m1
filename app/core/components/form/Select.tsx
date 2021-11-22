import { FunctionComponent } from 'react'
import { Field } from 'react-final-form'
import ReactSelect from 'react-select'
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types'

import Grid from '../shared/Grid'

const ReactSelectAdapter = ({ input, ...rest }) => (
  <ReactSelect {...input} {...rest} />
)

const ReactAsyncSelectAdapter = ({ input, ...rest }) => (
  <AsyncSelect {...input} {...rest} />
)

const Select: FunctionComponent<any> = (props) => {
  const { name, items, ...rest } = props;

  const filterItems = (inputValue: string) => {
    return items.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterItems(inputValue));
      }, 1000);
    });

  if (props.isAsync) {
    return (
      <Grid item xs={props.xs} md={props.md}>
        <Field
          {...rest}
          name={name}
          defaultOptions
          cacheOptions
          component={ReactAsyncSelectAdapter}
          loadOptions={promiseOptions}
          isSearchable
        />
      </Grid>
    )
  }
  return (
    <Grid item xs={props.xs} md={props.md}>
      <Field
        {...rest}
        name={name}
        component={ReactSelectAdapter}
        options={items}
      />
    </Grid>
  )
}

Select.defaultProps = {
  isAsync: false,
  isMulti: false,
  isSearchable: false,
}

Select.propTypes = {
  isAsync: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired
}

export default Select;