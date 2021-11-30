import { render } from '@testing-library/react';
import CalculatorContainer from '../components/CalculatorContainer';

test('renders learn react link', () => {
  render(<CalculatorContainer type="calc" />);
});
