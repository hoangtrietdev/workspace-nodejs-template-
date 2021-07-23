import { Resident } from "../resident/model";

export interface ClientConfigResponseDto {
  googleClientId: string;
  appIcon?: string;
}

export enum ConfigDataType {
  String = "string",
  Url = "url",
  Number = "number",
  ListString = "list-string",
  Boolean = "boolean",
  Image = "image",
}

export interface SystemConfig {
  key: string;
  title: string;
  description?: string;
  group?: string;
  dataType?: ConfigDataType;
  configurable?: boolean;
  required?: boolean;
  value?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SystemConfigDto {
  key: string;
  value?: string;
}

export enum HealthStatus {
  Error = "error",
  Ok = "ok",
  ShuttingDown = "shutting_down",
}

export enum ServiceHealthStatus {
  Up = "up",
  Down = "down",
}

export interface ServiceHealthStatusDto {
  status: ServiceHealthStatus;
  message?: string;
}

export interface ServiceHealthDto {
  database: ServiceHealthStatusDto;
}

export interface HealthDto {
  status: HealthStatus;

  /** Uptime in seconds */
  uptime: number;

  /** Is in maintenance mode? */
  maintenance: boolean;
  info: ServiceHealthDto;
  error: ServiceHealthDto;
}

export interface LoginRequestDto {
  googleTokenId: string;
}

export interface LoginResponseDto {
  token: string;
}

export enum UserRole {
  Authenticated = "authenticated",
  Member = "member",
  Ci = "ci",
  System = "system",
  DataEditor = "data-editor",
  DataAdmin = "data-admin",
  ProtoAdmin = "proto-admin",
  Admin = "admin",
  Deployer = "deployer",
  CsViewer = "cs-viewer",
  CsEditor = "cs-editor",
}

export interface UserRoleMapping {
  role: UserRole;
  environments?: string[];
  isBaseRole?: string;
}

export interface Role {
  name: string;
  title: string;
  description: string;
  isDefault?: boolean;
  environmentSpecific?: boolean;
  includes?: string[];
}

export interface StringOperators {
  in?: string[];
  nin?: string[];
}

export interface NumberOperators {
  in?: number[];
  nin?: number[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
}

export interface DateOperators {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

export interface ResidentWhereOptions {
  email?: string | StringOperators;
  name?: string | StringOperators;
  locked?: number | NumberOperators;
  avatar?: string | StringOperators;
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ResidentOrderOptions {
  email?: OrderDirection;
  name?: OrderDirection;
  locked?: OrderDirection;
  avatar?: OrderDirection;
}

export interface ResidentPagingFilterOptions {
  select?: ("email" | "name" | "locked" | "avatar")[];
  where?: ResidentWhereOptions;
  order?: ResidentOrderOptions;
  skip?: number;
  take?: number;
}

export interface ResidentPagingResult {
  total: number;
  skip: number;
  take: number;
  data: Resident[];
}

export interface LogWhereOptions {
  id?: number | NumberOperators;
  action?: string | StringOperators;
  avatar?: string | StringOperators;
  name?: string | StringOperators;
  note?: string | StringOperators;
  pageName?: string | StringOperators;
  updateBy?: string | StringOperators;
  updateOn?: NumberOperators;
}

export interface LogOrderOptions {
  id?: OrderDirection;
  action?: OrderDirection;
  avatar?: OrderDirection;
  name?: OrderDirection;
  note?: OrderDirection;
  pageName?: OrderDirection;
  updateBy?: OrderDirection;
  updateOn?: OrderDirection;
}

export interface LogPagingFilterOptions {
  select?: (
    | "id"
    | "action"
    | "avatar"
    | "name"
    | "note"
    | "pageName"
    | "updateBy"
    | "updateOn"
  )[];
  where?: LogWhereOptions;
  order?: LogOrderOptions;
  skip?: number;
  take?: number;
}

export interface Log {
  id?: number;
  action: string;
  avatar: string;
  name?: string;
  note?: string;
  pageName: string;
  updateBy: string;
  updateOn: string;
}

export interface LogPagingResult {
  total: number;
  skip: number;
  take: number;
  data: Log[];
}

export interface BlueprintProtoUpdateHistory {
  id?: number;
  sha: string;
  note?: string;
  status: "UPDATING" | "SUCCESS" | "FAILED" | "TIMEOUT";
  source: "GITLAB" | "TOOL";

  /** Raw proto structure in JSON */
  proto?: string;
  userEmail: string;
  userAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GitlabBodyDto {
  branch?: string;
  note?: string;
}

export interface BlueprintProtoUpdateHistoryWhereOptions {
  id?: number | NumberOperators;
  sha?: string | StringOperators;
  note?: string | StringOperators;
  status?: "UPDATING" | "SUCCESS" | "FAILED" | "TIMEOUT" | StringOperators;
  source?: "GITLAB" | "TOOL" | StringOperators;
  proto?: string | StringOperators;
  userEmail?: string | StringOperators;
  userAvatar?: string | StringOperators;
}

export interface BlueprintProtoUpdateHistoryOrderOptions {
  id?: OrderDirection;
  sha?: OrderDirection;
  note?: OrderDirection;
  status?: OrderDirection;
  source?: OrderDirection;
  proto?: OrderDirection;
  userEmail?: OrderDirection;
  userAvatar?: OrderDirection;
}

export interface BlueprintProtoUpdateHistoryPagingFilterOptions {
  select?: (
    | "id"
    | "sha"
    | "note"
    | "status"
    | "source"
    | "proto"
    | "userEmail"
    | "userAvatar"
  )[];
  where?: BlueprintProtoUpdateHistoryWhereOptions;
  order?: BlueprintProtoUpdateHistoryOrderOptions;
  skip?: number;
  take?: number;
}

export interface BlueprintProtoUpdateHistoryPagingResult {
  total: number;
  skip: number;
  take: number;
  data: BlueprintProtoUpdateHistory[];
}

export interface VariantSetting {
  name?: string;
  key: string;
}

export interface FieldReference {
  type: string;
  valueField: string;
  displayField?: string;
}

export enum FieldDataType {
  Date = "date",
  Time = "time",
  DateTime = "date-time",
  LongText = "long-text",
  Url = "url",
}

export interface FieldSettings {
  field: string;
  reference?: FieldReference;
  required?: boolean;
  editable?: boolean;
  dataType?: FieldDataType;
}

export interface BlueprintProtoWhereOptions {
  name?: string | StringOperators;
  type?: string | StringOperators;
  shortName?: string | StringOperators;

  /** Raw proto structure in JSON */
  proto?: object;

  /** Indicate a protobuf message represent an Enum */
  isEnum?: boolean;

  /** Indicate a protobuf message represent a Blueprint */
  isBlueprint?: boolean;

  /** Indicate Blueprint has multiple variants */
  isVariant?: boolean;
  variants?: VariantSetting[];
  isSingle?: boolean;
  idFields?: string[];
  settings?: FieldSettings[];

  /** Indicate a protobuf message is disabled */
  enabled?: object;
}

export interface BlueprintProtoOrderOptions {
  name?: OrderDirection;
  type?: OrderDirection;
  shortName?: OrderDirection;
  proto?: OrderDirection;
  isEnum?: OrderDirection;
  isBlueprint?: OrderDirection;
  isVariant?: OrderDirection;
  variants?: OrderDirection;
  isSingle?: OrderDirection;
  idFields?: OrderDirection;
  settings?: OrderDirection;
  enabled?: OrderDirection;
}

export interface BlueprintProtoPagingFilterOptions {
  select?: (
    | "name"
    | "type"
    | "shortName"
    | "proto"
    | "isEnum"
    | "isBlueprint"
    | "isVariant"
    | "variants"
    | "isSingle"
    | "idFields"
    | "settings"
    | "enabled"
  )[];
  where?: BlueprintProtoWhereOptions;
  order?: BlueprintProtoOrderOptions;
  skip?: number;
  take?: number;
}

export interface BlueprintProto {
  /** Protobuf message type name */
  name: string;

  /** Protobuf message type */
  type: string;
  shortName: string;

  /** Raw proto structure in JSON */
  proto: object;

  /** Indicate a protobuf message represent an Enum */
  isEnum?: boolean;

  /** Indicate a protobuf message represent a Blueprint */
  isBlueprint?: boolean;

  /** Indicate Blueprint has multiple variants */
  isVariant?: boolean;
  variants?: VariantSetting[];
  isSingle?: boolean;
  idFields?: string[];
  settings?: FieldSettings[];

  /** Indicate a protobuf message is disabled */
  enabled?: object;
  protoUpdateId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CloneBlueprintProtoDto {
  name: string;
  shortName: string;
  oldName: string;
}

export interface BlueprintDataVersionWhereOptions {
  name?: string | StringOperators;
  isBaseVersion?: boolean;
  baseVersion?: string | StringOperators;

  /** Indicate this version is not editable */
  isReadOnly?: boolean;
  protoUpdateId?: number | NumberOperators;
}

export interface BlueprintDataVersionOrderOptions {
  name?: OrderDirection;
  isBaseVersion?: OrderDirection;
  baseVersion?: OrderDirection;
  isReadOnly?: OrderDirection;
  protoUpdateId?: OrderDirection;
}

export interface BlueprintDataVersionPagingFilterOptions {
  select?: (
    | "name"
    | "isBaseVersion"
    | "baseVersion"
    | "isReadOnly"
    | "protoUpdateId"
  )[];
  where?: BlueprintDataVersionWhereOptions;
  order?: BlueprintDataVersionOrderOptions;
  skip?: number;
  take?: number;
}

export interface BlueprintDataVersion {
  name: string;
  isBaseVersion: boolean;
  baseVersion?: string;

  /** Indicate this version is not editable */
  isReadOnly?: boolean;

  /** Lock this data version with a proto version */
  protoUpdateId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export enum TaskStatus {
  PENDING = "PENDING",
  DEPLOYING = "DEPLOYING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  TIMEOUT = "TIMEOUT",
}

export interface BlueprintDeployHistory {
  /** Task status */
  status: TaskStatus;
  message?: string;

  /** Schedule a task */
  scheduledAt?: string;
  startTime?: string;
  endTime?: string;
  id?: number;

  /** Deploy environment */
  environment: string;

  /** Blueprint proto type name */
  types: string[];
  version: string;

  /** Timestamp of last change log record */
  lastChangedAt: string;

  /** ID of last proto update record */
  lastProtoUpdateId: number;
  note?: string;
  forceUpdate?: boolean;

  /** Who made the change */
  userEmail: string;
  userAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlueprintDataVersionDetailDto {
  version: BlueprintDataVersion;
  protoUpdate?: BlueprintProtoUpdateHistory;
  deployments: BlueprintDeployHistory[];
}

export interface BlueprintDataVersionPagingResult {
  total: number;
  skip: number;
  take: number;
  data: BlueprintDataVersion[];
}

export interface BlueprintDeployHistoryWhereOptions {
  status?:
    | "PENDING"
    | "DEPLOYING"
    | "SUCCESS"
    | "FAIL"
    | "TIMEOUT"
    | StringOperators;
  message?: string | StringOperators;
  scheduledAt?: NumberOperators;
  startTime?: NumberOperators;
  endTime?: NumberOperators;
  id?: number | NumberOperators;
  environment?: string | StringOperators;

  /** Blueprint proto type name */
  types?: string[];
  version?: string | StringOperators;
  lastChangedAt?: string | StringOperators;
  lastProtoUpdateId?: number | NumberOperators;
  note?: string | StringOperators;
  forceUpdate?: boolean;
  userEmail?: string | StringOperators;
  userAvatar?: string | StringOperators;
}

export interface BlueprintDeployHistoryOrderOptions {
  status?: OrderDirection;
  message?: OrderDirection;
  scheduledAt?: OrderDirection;
  startTime?: OrderDirection;
  endTime?: OrderDirection;
  id?: OrderDirection;
  environment?: OrderDirection;
  types?: OrderDirection;
  version?: OrderDirection;
  lastChangedAt?: OrderDirection;
  lastProtoUpdateId?: OrderDirection;
  note?: OrderDirection;
  forceUpdate?: OrderDirection;
  userEmail?: OrderDirection;
  userAvatar?: OrderDirection;
}

export interface BlueprintDeployHistoryPagingFilterOptions {
  select?: (
    | "status"
    | "message"
    | "scheduledAt"
    | "startTime"
    | "endTime"
    | "id"
    | "environment"
    | "types"
    | "version"
    | "lastChangedAt"
    | "lastProtoUpdateId"
    | "note"
    | "forceUpdate"
    | "userEmail"
    | "userAvatar"
  )[];
  where?: BlueprintDeployHistoryWhereOptions;
  order?: BlueprintDeployHistoryOrderOptions;
  skip?: number;
  take?: number;
}

export interface BlueprintDeployHistoryPagingResult {
  total: number;
  skip: number;
  take: number;
  data: BlueprintDeployHistory[];
}

export enum BlueprintDataState {
  A = "A",
  D = "D",
  U = "U",
}

export interface BlueprintData {
  objId?: string;

  /** Blueprint proto type name */
  type: string;

  /** Blueprint version */
  version: string;

  /** Blueprint data variant */
  variant?: string;
  data: object;

  /** Indicate state of the data in current version is (A)dded, (D)eleted or (U)pdated. Not set when untouched */
  state?: BlueprintDataState;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlueprintDataDiffNew {
  kind: string;
  path?: (string | number)[];
  rhs: any;
}

export interface BlueprintDataDiffDeleted {
  kind: string;
  path?: (string | number)[];
  lhs: any;
}

export interface BlueprintDataDiffEdit {
  kind: string;
  path?: (string | number)[];
  lhs: any;
  rhs: any;
}

export interface BlueprintDataDiffArray {
  kind: string;
  path?: (string | number)[];
  index: number;
  item:
    | BlueprintDataDiffNew
    | BlueprintDataDiffDeleted
    | BlueprintDataDiffEdit
    | BlueprintDataDiffArray;
}

export interface BlueprintDataChangeLog {
  id?: number;

  /** Modified blueprint object ID */
  objId: string;

  /** Protobuf type name */
  type: string;

  /** Blueprint version */
  version: string;

  /** Blueprint data variant */
  variant?: string;
  data: (
    | BlueprintDataDiffNew
    | BlueprintDataDiffDeleted
    | BlueprintDataDiffEdit
    | BlueprintDataDiffArray
  )[];

  /** Who made the change */
  userEmail: string;
  userAvatar?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlueprintDataWithChangeLogsDto {
  data: BlueprintData[];
  changeLogs?: BlueprintDataChangeLog[];
  deletedData?: BlueprintData[];
}

export interface BlueprintDataStoreResultDto {
  data: BlueprintData;
  change?: BlueprintDataChangeLog;
}

export interface DeleteMultipleBlueprintDataDto {
  objIds: string[];
}

export interface BlueprintDataMoveChangesDto {
  version: string;
  toVersion: string;
  type: string;
  objIds?: string[];
}

export interface BlueprintDataMoveTypeChangesDto {
  type: string;
  objIds?: string[];
}

export interface BlueprintDataMoveMultipleChangesDto {
  version: string;
  toVersion: string;
  types: BlueprintDataMoveTypeChangesDto[];
}

export interface BlueprintDataChangeAggregate {
  id?: number;

  /** Modified blueprint object ID */
  objId: string;

  /** Protobuf type name */
  type: string;

  /** Blueprint version */
  version: string;

  /** Blueprint data variant */
  variant?: string;
  data: (
    | BlueprintDataDiffNew
    | BlueprintDataDiffDeleted
    | BlueprintDataDiffEdit
    | BlueprintDataDiffArray
  )[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlueprintDataChangeLogWhereOptions {
  id?: number | NumberOperators;
  objId?: string | StringOperators;
  type?: string | StringOperators;
  version?: string | StringOperators;
  variant?: string | StringOperators;
  data?: (
    | BlueprintDataDiffNew
    | BlueprintDataDiffDeleted
    | BlueprintDataDiffEdit
    | BlueprintDataDiffArray
  )[];
  userEmail?: string | StringOperators;
  userAvatar?: string | StringOperators;
}

export interface BlueprintDataChangeLogOrderOptions {
  id?: OrderDirection;
  objId?: OrderDirection;
  type?: OrderDirection;
  version?: OrderDirection;
  variant?: OrderDirection;
  data?: OrderDirection;
  userEmail?: OrderDirection;
  userAvatar?: OrderDirection;
}

export interface BlueprintDataChangeLogPagingFilterOptions {
  select?: (
    | "id"
    | "objId"
    | "type"
    | "version"
    | "variant"
    | "data"
    | "userEmail"
    | "userAvatar"
  )[];
  where?: BlueprintDataChangeLogWhereOptions;
  order?: BlueprintDataChangeLogOrderOptions;
  skip?: number;
  take?: number;
}

export interface BlueprintDataChangeLogPagingResult {
  total: number;
  skip: number;
  take: number;
  data: BlueprintDataChangeLog[];
}

export enum BlueprintDataFormat {
  Xlsx = "xlsx",
  Csv = "csv",
}

export interface FileUploadDto {
  file: File;
}

export interface BlueprintImportResultDto {
  type: string;
  total: number;
}

export interface BlueprintDeployDto {
  environment: string;
  version: string;
  types?: string[];
  note?: string;
  forceUpdate?: boolean;
}

export interface EnvironmentWhereOptions {
  name?: string | StringOperators;
  config?: object;
}

export interface EnvironmentOrderOptions {
  name?: OrderDirection;
  config?: OrderDirection;
}

export interface EnvironmentPagingFilterOptions {
  select?: ("name" | "config")[];
  where?: EnvironmentWhereOptions;
  order?: EnvironmentOrderOptions;
  skip?: number;
  take?: number;
}

export interface EnvironmentConfigField {
  name: string;
  type: "number" | "string" | "boolean" | "credentials-url";
  required?: boolean;
  dataType: string;
}

export interface Environment {
  name: string;
  config: object;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnvironmentPagingResult {
  total: number;
  skip: number;
  take: number;
  data: Environment[];
}

export interface AssetConfigWhereOptions {
  id?: number | NumberOperators;
  clientVersion?: string | StringOperators;
  odl?: string | StringOperators;
  odb?: string | StringOperators;
  assetBundle?: string | StringOperators;
  platform?: "Android" | "iOS" | StringOperators;
  environment?: string | StringOperators;
}

export interface AssetConfigOrderOptions {
  id?: OrderDirection;
  clientVersion?: OrderDirection;
  odl?: OrderDirection;
  odb?: OrderDirection;
  assetBundle?: OrderDirection;
  platform?: OrderDirection;
  environment?: OrderDirection;
}

export interface AssetConfigPagingFilterOptions {
  select?: (
    | "id"
    | "clientVersion"
    | "odl"
    | "odb"
    | "assetBundle"
    | "platform"
    | "environment"
  )[];
  where?: AssetConfigWhereOptions;
  order?: AssetConfigOrderOptions;
  skip?: number;
  take?: number;
}

export enum AssetPlatform {
  Android = "Android",
  IOS = "iOS",
}

export interface AssetConfig {
  id?: number;
  clientVersion: string;
  odl: string;
  odb: string;
  assetBundle: string;
  platform: AssetPlatform;
  environment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssetConfigPagingResult {
  total: number;
  skip: number;
  take: number;
  data: AssetConfig[];
}

export interface GameConfigWhereOptions {
  id?: number | NumberOperators;
  blueprintVersion?: string | StringOperators;
  environment?: string | StringOperators;
  clientVersion?: string | StringOperators;
  score?: number | NumberOperators;
  keyRedis?: string | StringOperators;
  forcedUpdate?: boolean;
}

export interface GameConfigOrderOptions {
  id?: OrderDirection;
  blueprintVersion?: OrderDirection;
  environment?: OrderDirection;
  clientVersion?: OrderDirection;
  score?: OrderDirection;
  keyRedis?: OrderDirection;
  forcedUpdate?: OrderDirection;
}

export interface GameConfigPagingFilterOptions {
  select?: (
    | "id"
    | "blueprintVersion"
    | "environment"
    | "clientVersion"
    | "score"
    | "keyRedis"
    | "forcedUpdate"
  )[];
  where?: GameConfigWhereOptions;
  order?: GameConfigOrderOptions;
  skip?: number;
  take?: number;
}

export interface GameConfig {
  id?: number;
  blueprintVersion: string;
  environment: string;
  clientVersion: string;
  score?: number;
  keyRedis?: string;
  forcedUpdate?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GameConfigPagingResult {
  total: number;
  skip: number;
  take: number;
  data: GameConfig[];
}

export interface GenerateTokenDto {
  expireDate?: string;
}

export interface GenerateTokenResponseDto {
  token: string;
}

export interface BaseCurrencyBlueprint {
  id: string;
  capacity: number;
}

export interface Currency {
  currency: string;
  amount: number;
  update: number;
}

export interface RbeDto {
  achievements: object;
  events: Record<string, any>;
}

export interface Player {
  id: string;
  playerId: string;
  name: string;
  version: string;
  xp: number;
  ban: boolean;
  resources: Currency[];
  created: number;
  update: number;
  rbe?: RbeDto;
}

export interface CurrencyDto {
  currency: string;
  amount: number;
  update: number;
}

export interface InboxMessageExtraProto {
  name: string;
  proto: object;
}

export interface InboxMessageProtoDto {
  messageBlueprint: BlueprintProto;
  extraProtos?: InboxMessageExtraProto[];
}

export interface InboxDto {
  file: File;
  environment: string;
  data: string;
  note?: string;
  scheduledAt?: string;
}

export interface InboxHistory {
  /** Task status */
  status: TaskStatus;
  message?: string;

  /** Schedule a task */
  scheduledAt?: string;
  startTime?: string;
  endTime?: string;
  id?: number;
  environment: string;
  data: object;
  playerIds: string[];
  note?: string;
  userEmail: string;
  userAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InboxHistoryWhereOptions {
  status?:
    | "PENDING"
    | "DEPLOYING"
    | "SUCCESS"
    | "FAIL"
    | "TIMEOUT"
    | StringOperators;
  message?: string | StringOperators;
  scheduledAt?: NumberOperators;
  startTime?: NumberOperators;
  endTime?: NumberOperators;
  id?: number | NumberOperators;
  environment?: string | StringOperators;
  data?: object;
  playerIds?: string[];
  note?: string | StringOperators;
  userEmail?: string | StringOperators;
  userAvatar?: string | StringOperators;
}

export interface InboxHistoryOrderOptions {
  status?: OrderDirection;
  message?: OrderDirection;
  scheduledAt?: OrderDirection;
  startTime?: OrderDirection;
  endTime?: OrderDirection;
  id?: OrderDirection;
  environment?: OrderDirection;
  data?: OrderDirection;
  playerIds?: OrderDirection;
  note?: OrderDirection;
  userEmail?: OrderDirection;
  userAvatar?: OrderDirection;
}

export interface InboxHistoryPagingFilterOptions {
  select?: (
    | "status"
    | "message"
    | "scheduledAt"
    | "startTime"
    | "endTime"
    | "id"
    | "environment"
    | "data"
    | "playerIds"
    | "note"
    | "userEmail"
    | "userAvatar"
  )[];
  where?: InboxHistoryWhereOptions;
  order?: InboxHistoryOrderOptions;
  skip?: number;
  take?: number;
}

export interface InboxHistoryPagingResult {
  total: number;
  skip: number;
  take: number;
  data: InboxHistory[];
}

export interface BotWhereOptions {
  id?: number | NumberOperators;
  userId?: string | StringOperators;
  playerId?: string | StringOperators;
  leaderBoard?: string | StringOperators;
  score?: number | NumberOperators;
  clientVersion?: string | StringOperators;
  enviroment?: string | StringOperators;
}

export interface BotOrderOptions {
  id?: OrderDirection;
  userId?: OrderDirection;
  playerId?: OrderDirection;
  leaderBoard?: OrderDirection;
  score?: OrderDirection;
  clientVersion?: OrderDirection;
  enviroment?: OrderDirection;
}

export interface BotPagingFilterOptions {
  select?: (
    | "id"
    | "userId"
    | "playerId"
    | "leaderBoard"
    | "score"
    | "clientVersion"
    | "enviroment"
  )[];
  where?: BotWhereOptions;
  order?: BotOrderOptions;
  skip?: number;
  take?: number;
}

export interface BotBulkCreateDto {
  clientVersion: string;
  numberBot: number;
  score: number;
  leaderBoard: string;
  enviroment: string;
}

export interface Bot {
  id?: number;
  userId: string;
  playerId: string;
  leaderBoard: string;
  score: number;
  clientVersion: string;
  enviroment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BotPagingResult {
  total: number;
  skip: number;
  take: number;
  data: Bot[];
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type Interceptors = {
  request?: ({
    options,
  }: {
    options: RequestParams;
  }) => Promise<RequestParams> | RequestParams;
  response?: <D extends unknown = unknown, E extends unknown = unknown>({
    response,
  }: {
    response: HttpResponse<D, E>;
  }) => Promise<HttpResponse<D, E>>;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
  interceptors?: Interceptors;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D | null;
  error: E | null;
}

enum BodyType {
  Json,
  FormData,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] =
    null;
  private interceptors: Interceptors = {};

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string): string {
    let value: any = query[key];
    if (Array.isArray(value)) {
      value = value.join(",");
    } else if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  protected addQueryParams = (rawQuery?: RequestQueryParamsType): string => {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => typeof query[key] !== "undefined"
    );
    return keys.length
      ? `?${keys.map((key) => this.addQueryParam(query, key)).join("&")}`
      : "";
  };

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
  };

  private mergeRequestOptions(
    params: RequestParams,
    securityParams?: RequestParams
  ): RequestParams {
    const mergedParams = {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };

    if (!(mergedParams.headers as any)["Content-Type"]) {
      delete (mergedParams.headers as any)["Content-Type"];
    }
    return mergedParams;
  }

  private safeParseResponse = <T = any, E = any>(
    response: Response
  ): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = null;
    r.error = null;

    if (!response.headers.get("content-type")?.includes("application/json")) {
      return Promise.resolve(r);
    }

    return response
      .json()
      .then((data) => {
        if (r.ok) {
          r.data = data;
        } else {
          r.error = data;
        }
        return r;
      })
      .catch((e) => {
        r.error = e;
        return r;
      });
  };

  public request = async <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean
  ): Promise<HttpResponse<T, E>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker
        ? this.securityWorker(this.securityData)
        : {};
    let options = this.mergeRequestOptions(params, secureOptions);
    if (this.interceptors.request) {
      options = await Promise.resolve(this.interceptors.request({ options }));
    }
    const requestOptions = {
      ...options,
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      let data = await this.safeParseResponse<T, E>(response);
      if (this.interceptors.response) {
        data = await this.interceptors.response<T, E>({ response: data });
      }
      // if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title In-House Tool API
 * @version 1.0.0
 * Powered by GearInc
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  api = {
    ResidentControllerCreate: (data: Resident, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident/`,
        "POST",
        params,
        data,
        BodyType.Json,
        true
      ),

    ResidentControllerImage: (data: any, params?: RequestParams) =>
    this.request<Resident, any>(
      `/api/resident/image`,
      "POST",
      params,
      data,
      BodyType.Json,
      true
    ),

    ResidentControllerList: (
      query?: {
        select?: [];
        order?: any;
        where?: any;
        skip?: number;
        take?: number;
      },
      params?: RequestParams
    ) =>
      this.request<ResidentPagingResult, any>(
        `/api/resident${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_getAll
     * @request GET:/api/resident/all
     * @secure
     */
    ResidentControllerGetAll: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident[], any>(
        `/api/resident/all${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findOne
     * @request GET:/api/resident/findOne
     * @secure
     */
    ResidentControllerFindOne: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident/findOne${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findById
     * @request GET:/api/resident/{id}
     * @secure
     */
    ResidentControllerFindById: (id: string, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident/${id}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_update
     * @request PUT:/api/resident/{id}
     * @secure
     */
    ResidentControllerUpdate: (
      id: string,
      data: Resident,
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident/${id}`,
        "PUT",
        params,
        data,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_deleteById
     * @request DELETE:/api/resident/{id}
     * @secure
     */
    ResidentControllerDeleteById: (id: string, params?: RequestParams) =>
      this.request<boolean, any>(
        `/api/resident/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true
      ),

    //// r1



    Resident1ControllerCreate: (data: Resident, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident1/`,
        "POST",
        params,
        data,
        BodyType.Json,
        true
      ),

    Resident1ControllerImage: (data: any, params?: RequestParams) =>
    this.request<Resident, any>(
      `/api/resident1/image`,
      "POST",
      params,
      data,
      BodyType.Json,
      true
    ),

    Resident1ControllerList: (
      query?: {
        select?: [];
        order?: any;
        where?: any;
        skip?: number;
        take?: number;
      },
      params?: RequestParams
    ) =>
      this.request<ResidentPagingResult, any>(
        `/api/resident1${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_getAll
     * @request GET:/api/resident/all
     * @secure
     */
    Resident1ControllerGetAll: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident[], any>(
        `/api/resident1/all${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findOne
     * @request GET:/api/resident/findOne
     * @secure
     */
    Resident1ControllerFindOne: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident1/findOne${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findById
     * @request GET:/api/resident/{id}
     * @secure
     */
    Resident1ControllerFindById: (id: string, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident1/${id}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_update
     * @request PUT:/api/resident/{id}
     * @secure
     */
    Resident1ControllerUpdate: (
      id: string,
      data: Resident,
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident1/${id}`,
        "PUT",
        params,
        data,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_deleteById
     * @request DELETE:/api/resident/{id}
     * @secure
     */
    Resident1ControllerDeleteById: (id: string, params?: RequestParams) =>
      this.request<boolean, any>(
        `/api/resident1/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true
      ),

    ////2 
    Resident2ControllerCreate: (data: Resident, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident2/`,
        "POST",
        params,
        data,
        BodyType.Json,
        true
      ),

    Resident2ControllerImage: (data: any, params?: RequestParams) =>
    this.request<Resident, any>(
      `/api/resident2/image`,
      "POST",
      params,
      data,
      BodyType.Json,
      true
    ),

    Resident2ControllerList: (
      query?: {
        select?: [];
        order?: any;
        where?: any;
        skip?: number;
        take?: number;
      },
      params?: RequestParams
    ) =>
      this.request<ResidentPagingResult, any>(
        `/api/resident2${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_getAll
     * @request GET:/api/resident/all
     * @secure
     */
    Resident2ControllerGetAll: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident[], any>(
        `/api/resident2/all${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findOne
     * @request GET:/api/resident/findOne
     * @secure
     */
    Resident2ControllerFindOne: (
      query?: { select?: []; order?: any; where?: any },
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident2/findOne${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_findById
     * @request GET:/api/resident/{id}
     * @secure
     */
    Resident2ControllerFindById: (id: string, params?: RequestParams) =>
      this.request<Resident, any>(
        `/api/resident2/${id}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_update
     * @request PUT:/api/resident/{id}
     * @secure
     */
    Resident2ControllerUpdate: (
      id: string,
      data: Resident,
      params?: RequestParams
    ) =>
      this.request<Resident, any>(
        `/api/resident2/${id}`,
        "PUT",
        params,
        data,
        BodyType.Json,
        true
      ),

    /**
     * @tags users
     * @name ResidentController_deleteById
     * @request DELETE:/api/resident/{id}
     * @secure
     */
    Resident2ControllerDeleteById: (id: string, params?: RequestParams) =>
      this.request<boolean, any>(
        `/api/resident2/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true
      ),
  };
}
