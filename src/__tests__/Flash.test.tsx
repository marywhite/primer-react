import React from 'react'
import {Flash} from '..'
import theme from '../theme'
import {render, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Flash', () => {
  behavesAsComponent({Component: Flash})

  checkExports('Flash', {
    default: Flash,
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<Flash variant="warning" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('respects the "full" prop', () => {
    expect(render(<Flash full />)).toHaveStyleRule('margin-top', '-1px')
    expect(render(<Flash full />)).toHaveStyleRule('border-radius', '0')
    expect(render(<Flash full />)).toHaveStyleRule('border-width', '1px 0px')
  })

  it('respects the "variant" prop', () => {
    expect(render(<Flash variant="warning" />)).toHaveStyleRule(
      'background-color',
      theme.colorSchemes.light.colors.attention?.subtle,
    )
    expect(render(<Flash variant="danger" />)).toHaveStyleRule(
      'background-color',
      theme.colorSchemes.light.colors.danger?.subtle,
    )
    expect(render(<Flash variant="success" />)).toHaveStyleRule(
      'background-color',
      theme.colorSchemes.light.colors.success?.subtle,
    )
    expect(render(<Flash />)).toHaveStyleRule('background-color', theme.colorSchemes.light.colors.accent?.subtle)
  })
})
