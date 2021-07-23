import {
  LockOutlined,
  PlusOutlined,
  ReloadOutlined,
  UnlockTwoTone,
} from "@ant-design/icons";
import {
  Image,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Row,
  Typography,
  Input,
} from "antd";
import Search from "antd/lib/input/Search";
import Table, { ColumnProps, TableProps } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { FC } from "react";
import { useSetRecoilState } from "recoil";
import PreviewImage from "../../components/layout/preview-images";
import { FilterOrderOptions, OrderDirection } from "../../services/base/filter";
import { useResidentsList } from "../../services/resident";
import { Resident } from "../../services/resident/model";
import dayjs from "../../utils/dayjs";
import ResidentListAction from "./actions";
import { useResidencesContext } from "./context";
import ResidentModal from "./modal";
import { selectedResidentState, showResidentModalState } from "./states";

export const PAGING_PAGE_SIZE = 10;

const columns: Array<ColumnProps<Resident>> = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    align: "center",
    render: (data: string, item) => {
      if (data !== null && data.includes(".png")) {
        const logo = require(`./images/${data}`);
        return <Image src={logo.default} />;
      }
    },
    width: 100,
  },
  {
    title: "Họ và Tên",
    dataIndex: "ho_ten",
    key: "ho_ten",
  },
  {
    title: "Tuổi",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "SHSQ",
    dataIndex: "shsq",
    key: "shsq",
  },
  {
    title: "Năm Sinh",
    dataIndex: "nam_sinh",
    key: "nam_sinh",
    render: (value) => {
      if (value === null || value === undefined) {
        return dayjs("2000-02-02T00:00:00.000Z").format("DD/MM/YYYY");
      } else {
        return dayjs(value).format("DD/MM/YYYY");
      }
    },
  },
  {
    title: "Quê Quán",
    dataIndex: "que_quan",
    key: "que_quan",
  },
  {
    title: "Trú Quán",
    dataIndex: "tru_quan",
    key: "tru_quan",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "dia_chi",
    key: "dia_chi",
  },
  {
    title: "Văn Hoá",
    dataIndex: "van_hoa",
    key: "van_hoa",
  },
  {
    title: "Dân Tộc",
    dataIndex: "dan_toc",
    key: "dan_toc",
  },
  {
    title: "Đoàn Viên",
    dataIndex: "doan_vien",
    key: "doan_vien",
    render: (data, item) => <Checkbox checked={data} />,
  },
  {
    title: "Đảng",
    dataIndex: "dang",
    key: "dang",
    render: (data, item) => <Checkbox checked={data} />,
  },
  {
    title: "Ngày Vào Đảng",
    dataIndex: "ngay_vao_dang",
    key: "ngay_vao_dang",
    render: (value) => {
      if (value === null || value === undefined) {
        return dayjs("2000-02-02T00:00:00.000Z").format("DD/MM/YYYY");
      } else {
        return dayjs(value).format("DD/MM/YYYY");
      }
    },
  },
  {
    title: "Tôn Giáo",
    dataIndex: "ton_giao",
    key: "ton_giao",
  },
  {
    title: "Sức Khoẻ",
    dataIndex: "suc_khoe",
    key: "suc_khoe",
  },
  {
    title: "Nghề Nghiệp",
    dataIndex: "nghe_nghiep",
    key: "nghe_nghiep",
  },
  {
    title: "Nơi Làm Việc",
    dataIndex: "noi_lam_viec",
    key: "noi_lam_viec",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "so_dien_thoai",
    key: "so_dien_thoai",
  },
  // {
  //   title: "Họ Tên Cha",
  //   dataIndex: "ho_ten_cha",
  //   key: "ho_ten_cha",
  // },
  // {
  //   title: "Họ Tên Mẹ",
  //   dataIndex: "ho_ten_me",
  //   key: "ho_ten_me",
  // },
  // {
  //   title: "Họ Tên Vợ",
  //   dataIndex: "ho_ten_vo",
  //   key: "ho_ten_vo",
  // },
  // {
  //   title: "Số con",
  //   dataIndex: "so_con",
  //   key: "so_con",
  // },
  // {
  //   title: "Thành Phần Xuất Thân",
  //   dataIndex: "thanh_phan_xuat_than",
  //   key: "thanh_phan_xuat_than",
  // },
  {
    title: "Nhập Ngũ",
    dataIndex: "nhap_ngu",
    key: "nhap_ngu",
    render: (value) => {
      if (value === null || value === undefined) {
        return dayjs("2000-02-02T00:00:00.000Z").format("DD/MM/YYYY");
      } else {
        return dayjs(value).format("DD/MM/YYYY");
      }
    },
  },
  {
    title: "Xuất Ngũ",
    dataIndex: "xuat_ngu",
    key: "xuat_ngu",
    render: (value) => {
      if (value === null || value === undefined) {
        return dayjs("2000-02-02T00:00:00.000Z").format("DD/MM/YYYY");
      } else {
        return dayjs(value).format("DD/MM/YYYY");
      }
    },
  },
  {
    title: "Tên Đơn Vị",
    dataIndex: "ten_don_vi",
    key: "ten_don_vi",
  },
  {
    title: "Cấp Bậc",
    dataIndex: "cap_bac",
    key: "cap_bac",
  },
  {
    title: "Chức Vụ",
    dataIndex: "chuc_vu",
    key: "chuc_vu",
  },
  // {
  //   title: "Ghi Chú",
  //   dataIndex: "ghi_chu",
  //   key: "ghi_chu",
  // },
  {
    title: "",
    dataIndex: "",
    key: "action",
    render: (value, resident) => <ResidentListAction resident={resident} />,
    width: 85,
    align: "right",
  },
];

const ResidenceList: FC = () => {
  const { list } = useResidencesContext();
  const { data, total, setSkip, setTake, setOrder, setWhere, fetch } = list;

  const setShowForm = useSetRecoilState(showResidentModalState);
  const setSelectedResident = useSetRecoilState(selectedResidentState);

  const handleAdd = () => {
    setShowForm(true);
    setSelectedResident(undefined);
  };

  const onSearch = (value: string) => {
    if (value) {
      {
        setWhere({ ho_ten: value });
      }
    } else {
      setWhere({});
    }
  };

  const handleTableChange: TableProps<Resident>["onChange"] = (
    pageData,
    _,
    sorter
  ) => {
    const { current, pageSize } = pageData;
    const currentPage = (current as number) - 1;
    setSkip(currentPage * (pageSize ?? PAGING_PAGE_SIZE));
    setTake(pageSize);

    const sortData = Array.isArray(sorter) ? sorter : [sorter];
    const order = sortData.reduce<FilterOrderOptions>((all, item) => {
      if (item.field && item.order) {
        all[item.field as string] =
          item.order === "ascend" ? OrderDirection.ASC : OrderDirection.DESC;
      }
      return all;
    }, {});
    setOrder(order);
  };
  return (
    <div
      className="site-card-wrapper h-screen"
      style={{ padding: 24, minHeight: 360 }}
    >
      <ResidentModal />
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <div style={{ padding: "1%" }}>
          <Typography.Title level={4}>
            Danh sách
            <span className="ml-auto" style={{ marginLeft: "90%" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Add
              </Button>
              <ReloadOutlined onClick={fetch} />
            </span>
            <Search
              className="ms-5"
              placeholder="Họ và tên"
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Typography.Title>
        </div>
        <Table
          size="small"
          style={{ padding: "1%" }}
          columns={columns}
          rowKey="email"
          dataSource={data}
          pagination={{ total }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default ResidenceList;
