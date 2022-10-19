import Link from 'next/link'
import { stack as Menu } from 'react-burger-menu'

const BurgerMenu = () => {
  return (
    <Menu
      pageWrapId={'page-wrap'}
      right
      disableAutoFocus
      width={'100%'}
      // onClose={() => handleOnClose}
      className="flex flex-col"
      burgerButtonClassName={'menu-trigger'}
      burgerBarClassName={'menu-trigger-bars'}
      menuClassName={'burger-menu'}
      morphShapeClassName={'burger-morph-shape'}
      itemListClassName={'burger-item-list'}
      overlayClassName={'burger-overlay'}
    >
      <ul>
        <li>ダッシュボード</li>
        <li>イベント</li>
      </ul>
    </Menu>
  )
}

export default BurgerMenu
