import React, { useEffect, useState } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import PreviewImage from "../preview-images";
import { RouteItem, routes } from "../../../routes";
import { Link, useLocation } from "react-router-dom";
import "./sider.css";

const useMenu = () => {
  return routes.reduce<RouteItem[]>(function extractMenu(all, item) {
    if (item.hideInMenu) {
      return all;
    }

    if (item.children) {
      const children = item.children.reduce(extractMenu, []);
      if (children.length) {
        all.push({
          ...item,
          children: item.children.reduce(extractMenu, []),
        });
      }
    } else if (item.path) {
      all.push(item);
    }

    return all;
  }, []);
};

const getMenuMap = (menu: RouteItem[]) =>
  menu.reduce<Record<string, string>>(function extractMenu(all, item) {
    if (item.children) {
      item.children.reduce(extractMenu, all);
    } else {
      all[item.path ?? ""] = item.name;
    }

    return all;
  }, {});

const Sider = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const menu = useMenu();
  const menuMap = getMenuMap(menu);

  useEffect(() => {
    setSelectedKeys([menuMap[location.pathname]].filter(Boolean));
    // eslint-disable-next-line
  }, [location]);

  return (
    <AntdLayout.Sider
      className="shadow-sm"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        <div className="logo">
          <PreviewImage hidden={collapsed} width={200} />
          <PreviewImage hidden={!collapsed} width={80} />
        </div>

        {menu.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.name} title={item.title} icon={item.icon}>
              {item.children.map((child) => (
                <Menu.Item key={child.name} icon={child.icon}>
                  {child.path && <Link to={child.path}>{child.title}</Link>}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.name} icon={item.icon}>
              {item.path && <Link to={item.path}>{item.title}</Link>}
            </Menu.Item>
          )
        )}
      </Menu>
    </AntdLayout.Sider>
  );
};

export default Sider;
