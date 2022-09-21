import type { App } from 'vue';
// 全局完整注册
// import Antd from 'ant-design-vue';
import {
  ConfigProvider,
  Layout,
  Button,
  Drawer,
  Divider,
  Menu,
  Switch,
  Select,
  Card,
  Radio,
  Space,
  Dropdown,
  Result,
  Breadcrumb,
  Modal,
} from 'ant-design-vue';

export default function setupAntDesign(app: App<Element>) {
  // 全局完整注册
  // app.use(Antd);
  // 全局部分注册
  app.use(ConfigProvider);
  app.use(Layout);
  app.use(Button);
  app.use(Drawer);
  app.use(Divider);
  app.use(Menu);
  app.use(Switch);
  app.use(Select);
  app.use(Card);
  app.use(Radio);
  app.use(Space);
  app.use(Dropdown);
  app.use(Result);
  app.use(Breadcrumb);
  app.use(Modal);
}
