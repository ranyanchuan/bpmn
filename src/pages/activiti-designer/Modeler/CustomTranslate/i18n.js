/* eslint-disable quote-props,key-spacing */
// export default {
//   // Labels
//   'Activate the global connect tool' : '激活全局连接工具',
//   'Append {type}': '添加 {type}',
//   'Add Lane above': '在上面添加道',
//   'Divide into two Lanes': '分割成两个道',
//   'Divide into three Lanes': '分割成三个道',
//   'Add Lane below': '在下面添加道',
//   'Append compensation activity': '追加补偿活动',
//   'Change type': '修改类型',
//   'Connect using Association': '使用关联连接',
//   'Connect using Sequence/MessageFlow or Association': '使用顺序/消息流或者关联连接',
//   'Connect using DataInputAssociation': '使用数据输入关联连接',
//   'Remove': '移除',
//   'Activate the hand tool': '激活抓手工具',
//   'Activate the lasso tool': '激活套索工具',
//   'Activate the create/remove space tool': '激活创建/删除空间工具',
//   'Create expanded SubProcess': '创建扩展子过程',
//   'Create IntermediateThrowEvent/BoundaryEvent' : '创建中间抛出事件/边界事件',
//   'Create Pool/Participant': '创建池/参与者',
//   'Parallel Multi Instance': '并行多重事件',
//   'Sequential Multi Instance': '时序多重事件',
//   'Loop': '循环',w
//   'Ad-hoc': '即席',
//   'Create {type}': '创建 {type}',
//   'Task': '任务',
//   'Send Task': '发送任务',
//   'Receive Task': '接收任务',
//   'User Task': '用户任务',
//   'Manual Task': '手动任务',
//   'Business Rule Task': '业务规则任务',
//   'Service Task': '归档任务',
//   'Script Task': '脚本任务',
//   'Call Activity': '调用活动',
//   'Sub Process (collapsed)': '子进程（收起）',
//   'Sub Process (expanded)': '子进程（展开）',
//   'Intermediate Throw Event': '中间事件',
//   'Message Start Event': '消息开始事件',
//   'Timer Start Event': '定时开始事件',
//   'Conditional Start Event': '条件开始事件',
//   // 'Signal Start Event': 'Signal-Startereignis',
//   // 'Error Start Event': 'Fehler-Startereignis',
//   // 'Escalation Start Event': 'Eskalations-Startereignis',
//   // 'Compensation Start Event': 'Kompensations-Startereignis',
//   // 'Message Start Event (non-interrupting)': 'Nachrichten-Startereignis (nicht unterbrechend)',
//   // 'Timer Start Event (non-interrupting)': 'Zeit-Startereignis (nicht unterbrechend)',
//   // 'Conditional Start Event (non-interrupting)': 'Bedingtes Startereignis (nicht unterbrechend)',
//   // 'Signal Start Event (non-interrupting)': 'Signal-Startereignis (nicht unterbrechend)',
//   // 'Escalation Start Event (non-interrupting)': 'Eskalations-Startereignis (nicht unterbrechend)',
//   // 'Message Intermediate Catch Event': 'Eintretendes Nachrichten-Zwischenereignis',
//   // 'Message Intermediate Throw Event': 'Ausgelöstes Nachrichten-Zwischenereignis',
//   // 'Timer Intermediate Catch Event': 'Eintretendes Zeit-Zwischenereignis',
//   // 'Escalation Intermediate Throw Event': 'Ausgelöstes Eskalations-Zwischenereignis',
//   // 'Conditional Intermediate Catch Event': 'Eintretendes bedingtes Zwischenereignis',
//   // 'Link Intermediate Catch Event': 'Eintretendes Link-Zwischenereignis',
//   // 'Link Intermediate Throw Event': 'Ausgelöstes Link-Zwischenereignis',
//   // 'Compensation Intermediate Throw Event': 'Ausgelöstes Kompensations-Zwischenereignis',
//   // 'Signal Intermediate Catch Event': 'Eintretendes Signal-Zwischenereignis',
//   // 'Signal Intermediate Throw Event': 'Ausgelöstes Signal-Zwischenereignis',
//   // 'Message End Event': 'Nachrichten-Endereignis',
//   // 'Escalation End Event': 'Eskalations-Endereignis',
//   // 'Error End Event': 'Fehler-Endereignis',
//   // 'Cancel End Event': 'Abbruchs-Endereignis',
//   // 'Compensation End Event': 'Kompensations-Endereignis',
//   // 'Signal End Event': 'Signal-Endereignis',
//   // 'Terminate End Event': 'Terminierungs-Endereignis',
//   // 'Message Boundary Event': 'Angeheftetes Nachrichten-Zwischenereignis',
//   // 'Message Boundary Event (non-interrupting)': 'Angeheftetes Nachrichten-Zwischenereignis (nicht unterbrechend)',
//   // 'Timer Boundary Event': 'Angeheftetes Zeit-Zwischenereignis',
//   // 'Timer Boundary Event (non-interrupting)': 'Angeheftetes Zeit-Zwischenereignis (nicht unterbrechend)',
//   // 'Escalation Boundary Event': 'Angeheftetes Eskalations-Zwischenereignis',
//   // 'Escalation Boundary Event (non-interrupting)': 'Angeheftetes Eskalations-Zwischenereignis (nicht unterbrechend)',
//   // 'Conditional Boundary Event': 'Angeheftetes bedingtes Zwischenereignis',
//   // 'Conditional Boundary Event (non-interrupting)': 'Angeheftetes bedingtes Zwischenereignis (nicht unterbrechend)',
//   // 'Error Boundary Event': 'Angeheftetes Fehler-Zwischenereignis',
//   // 'Cancel Boundary Event': 'Angeheftetes Abbruch-Zwischenereignis',
//   // 'Signal Boundary Event': 'Angeheftetes Signal-Zwischenereignis',
//   // 'Signal Boundary Event (non-interrupting)': 'Angeheftetes Signal-Zwischenereignis (nicht unterbrechend)',
//   // 'Compensation Boundary Event': 'Angeheftetes Kompensations-Zwischenereignis',
//   'Exclusive Gateway': '判断'
//   // 'Parallel Gateway': 'Paralleles Gateway',
//   // 'Inclusive Gateway': 'Inklusives Gateway',
//   // 'Complex Gateway': 'Komplexes Gateway',
//   // 'Event based Gateway': 'Ereignis-basiertes Gateway',
//   // 'Transaction': 'Transaktion',
//   // 'Sub Process': 'Teilprozess',
//   // 'Event Sub Process': 'Ereignis-Teilprozess',
//   // 'Collapsed Pool': 'Zugeklappter Pool',
//   // 'Expanded Pool': 'Ausgeklappter Pool',
//
//   // // Errors
//   // 'no parent for {element} in {parent}': 'kein Eltern-Element für {element} in {parent}',
//   // 'no shape type specified': 'kein Typ der Form angegeben',
//   // 'flow elements must be children of pools/participants': 'Fluss-Elemente müssen Kinder von Pools/Teilnehmern sein',
//   // 'out of bounds release': 'außerhalb der Grenzen Release',
//   // 'more than {count} child lanes': 'mehr als {count} Lane-Kinder',
//   // 'element required': 'Element benötigt',
//   // 'diagram not part of bpmn:Definitions': 'Prozessmodell ist nicht Teil von bpmn:Definitions',
//   // 'no diagram to display': 'kein Prozessmodell',
//   // 'no process or collaboration to display': 'kein Prozess/Kollaboration',
//   // 'element {element} referenced by {referenced}#{property} not yet drawn': 'von {referenced}#{property} referenziertes Element {element} noch nicht gezeichnet',
//   // 'already rendered {element}': '{element} bereits gerendert',
//   // 'failed to import {element}': '{element} konnte nicht importiert werden'
// };


export default {

  // Labels
  'Activate the global connect tool': '激活全局连接工具',
  'Append {type}': '添加 {type}',
  'Add Lane above': '在上面添加道',
  'Divide into two Lanes': '分割成两个道',
  'Divide into three Lanes': '分割成三个道',
  'Add Lane below': '在下面添加道',
  'Append compensation activity': '追加补偿活动',
  'Change type': '修改类型',
  'Connect using Association': '使用关联连接',
  'Connect using Sequence/MessageFlow or Association': '使用顺序/消息流或者关联连接',
  'Connect using DataInputAssociation': '使用数据输入关联连接',
  'Remove': '移除',
  'Activate the hand tool': '激活抓手工具',
  'Activate the lasso tool': '激活套索工具',
  'Activate the create/remove space tool': '激活创建/删除空间工具',
  'Create expanded SubProcess': '创建扩展子过程',
  'Create IntermediateThrowEvent/BoundaryEvent': '创建中间抛出事件/边界事件',
  'Create Pool/Participant': '创建池/参与者',
  'Parallel Multi Instance': '并行多重事件',
  'Sequential Multi Instance': '时序多重事件',
  'DataObjectReference': '数据对象参考',
  'DataStoreReference': '数据存储参考',
  'Loop': '循环',
  'Ad-hoc': '即席',
  'Create {type}': '创建 {type}',
  'Task': '任务',
  'Send Task': '发送任务',
  'Receive Task': '接收任务',
  'User Task': '用户任务',
  'Manual Task': '手工任务',
  'Business Rule Task': '业务规则任务',
  'Service Task': '服务任务',
  'Script Task': '脚本任务',
  'Call Activity': '调用活动',
  'Sub Process (collapsed)': '子流程（折叠的）',
  'Sub Process (expanded)': '子流程（展开的）',
  'Start Event': '开始事件',
  'StartEvent': '开始事件',
  'Intermediate Throw Event': '中间事件',
  'End Event': '结束事件',
  'EndEvent': '结束事件',
  'Create Gateway': '创建网关',
  'Create Intermediate/Boundary Event': '创建中间/边界事件',
  'Message Start Event': '消息开始事件',
  'Timer Start Event': '定时开始事件',
  'Conditional Start Event': '条件开始事件',
  'Signal Start Event': '信号开始事件',
  'Error Start Event': '错误开始事件',
  'Escalation Start Event': '升级开始事件',
  'Compensation Start Event': '补偿开始事件',
  'Message Start Event (non-interrupting)': '消息开始事件（非中断）',
  'Timer Start Event (non-interrupting)': '定时开始事件（非中断）',
  'Conditional Start Event (non-interrupting)': '条件开始事件（非中断）',
  'Signal Start Event (non-interrupting)': '信号开始事件（非中断）',
  'Escalation Start Event (non-interrupting)': '升级开始事件（非中断）',
  'Message Intermediate Catch Event': '消息中间捕获事件',
  'Message Intermediate Throw Event': '消息中间抛出事件',
  'Timer Intermediate Catch Event': '定时中间捕获事件',
  'Escalation Intermediate Throw Event': '升级中间抛出事件',
  'Conditional Intermediate Catch Event': '条件中间捕获事件',
  'Link Intermediate Catch Event': '链接中间捕获事件',
  'Link Intermediate Throw Event': '链接中间抛出事件',
  'Compensation Intermediate Throw Event': '补偿中间抛出事件',
  'Signal Intermediate Catch Event': '信号中间捕获事件',
  'Signal Intermediate Throw Event': '信号中间抛出事件',
  'Message End Event': '消息结束事件',
  'Escalation End Event': '定时结束事件',
  'Error End Event': '错误结束事件',
  'Cancel End Event': '取消结束事件',
  'Compensation End Event': '补偿结束事件',
  'Signal End Event': '信号结束事件',
  'Terminate End Event': '终止结束事件',
  'Message Boundary Event': '消息边界事件',
  'Message Boundary Event (non-interrupting)': '消息边界事件（非中断）',
  'Timer Boundary Event': '定时边界事件',
  'Timer Boundary Event (non-interrupting)': '定时边界事件（非中断）',
  'Escalation Boundary Event': '升级边界事件',
  'Escalation Boundary Event (non-interrupting)': '升级边界事件（非中断）',
  'Conditional Boundary Event': '条件边界事件',
  'Conditional Boundary Event (non-interrupting)': '条件边界事件（非中断）',
  'Error Boundary Event': '错误边界事件',
  'Cancel Boundary Event': '取消边界事件',
  'Signal Boundary Event': '信号边界事件',
  'Signal Boundary Event (non-interrupting)': '信号边界事件（非中断）',
  'Compensation Boundary Event': '补偿边界事件',
  'Exclusive Gateway': '互斥网关',
  'Parallel Gateway': '并行网关',
  'Inclusive Gateway': '相容网关',
  'Complex Gateway': '复杂网关',
  'Event based Gateway': '事件网关',
  'Transaction': '转运',
  'Sub Process': '子流程',
  'Event Sub Process': '事件子流程',
  'Collapsed Pool': '折叠池',
  'Expanded Pool': '展开池',

  // Errors
  'no parent for {element} in {parent}': '在{parent}里，{element}没有父类',
  'no shape type specified': '没有指定的形状类型',
  'flow elements must be children of pools/participants': '流元素必须是池/参与者的子类',
  'out of bounds release': 'out of bounds release',
  'more than {count} child lanes': '子道大于{count} ',
  'element required': '元素不能为空',
  'diagram not part of bpmn:Definitions': '流程图不符合bpmn规范',
  'no diagram to display': '没有可展示的流程图',
  'no process or collaboration to display': '没有可展示的流程/协作',
  'element {element} referenced by {referenced}#{property} not yet drawn': '由{referenced}#{property}引用的{element}元素仍未绘制',
  'already rendered {element}': '{element} 已被渲染',
  'failed to import {element}': '导入{element}失败',
  // 属性面板的参数
  'Id': '编号',
  'Name': '名称',
  'General': '常规',
  'Details': '详情',
  'Message Name': '消息名称',
  'Message': '消息',
  'Initiator': '创建者',
  'Asynchronous Continuations': '持续异步',
  'Asynchronous Before': '异步前',
  'Asynchronous After': '异步后',
  'Job Configuration': '工作配置',
  'Exclusive': '排除',
  'Job Priority': '工作优先级',
  'Retry Time Cycle': '重试时间周期',
  'Documentation': '文档',
  'Element Documentation': '元素文档',
  'History Configuration': '历史配置',
  'History Time To Live': '历史的生存时间',
  'Forms': '表单',
  'Form Key': '表单key',
  'Form Fields': '表单字段',
  'Business Key': '业务key',
  'Form Field': '表单字段',
  'ID': '编号',
  'Type': '类型',
  'Label': '名称',
  'Default Value': '默认值',
  'Validation': '校验',
  'Add Constraint': '添加约束',
  'Config': '配置',
  'Properties': '属性',
  'Add Property': '添加属性',
  'Value': '值',
  'Listeners': '监听器',
  'Execution Listener': '执行监听',
  'Event Type': '事件类型',
  'Listener Type': '监听器类型',
  'Java Class': 'Java类',
  'Expression': '表达式',
  'Must provide a value': '必须提供一个值',
  'Delegate Expression': '代理表达式',
  'Script': '脚本',
  'Script Format': '脚本格式',
  'Script Type': '脚本类型',
  'Inline Script': '内联脚本',
  'External Script': '外部脚本',
  'Resource': '资源',
  'Field Injection': '字段注入',
  'Extensions': '扩展',
  'Input/Output': '输入/输出',
  'Input Parameters': '输入参数',
  'Output Parameters': '输出参数',
  'Parameters': '参数',
  'Output Parameter': '输出参数',
  'Timer Definition Type': '定时器定义类型',
  'Timer Definition': '定时器定义',
  'Date': '日期',
  'Duration': '持续',
  'Cycle': '循环',
  'Signal': '信号',
  'Signal Name': '信号名称',
  'Escalation': '升级',
  'Error': '错误',
  'Link Name': '链接名称',
  'Condition': '条件名称',
  'Variable Name': '变量名称',
  'Variable Event': '变量事件',
  'Specify more than one variable change event as a comma separated list.': '多个变量事件以逗号隔开',
  'Wait for Completion': '等待完成',
  'Activity Ref': '活动参考',
  'Version Tag': '版本标签',
  'Executable': '可执行文件',
  'External Task Configuration': '扩展任务配置',
  'Task Priority': '任务优先级',
  'External': '外部',
  'Connector': '连接器',
  'Must configure Connector': '必须配置连接器',
  'Connector Id': '连接器编号',
  'Implementation': '实现方式',
  'Field Injections': '字段注入',
  'Fields': '字段',
  'Result Variable': '结果变量',
  'Topic': '主题',
  'Configure Connector': '配置连接器',
  'Input Parameter': '输入参数',
  'Assignee': '代理人',
  'Candidate Users': '候选用户',
  'Candidate Groups': '候选组',
  'Due Date': '到期时间',
  'Follow Up Date': '跟踪日期',
  'Priority': '优先级',
  'The follow up date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)': '跟踪日期必须符合EL表达式，如： ${someDate} ,或者一个ISO标准日期，如：2015-06-26T09:54:00',
  'The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)': '跟踪日期必须符合EL表达式，如： ${someDate} ,或者一个ISO标准日期，如：2015-06-26T09:54:00',
  'Variables': '变量',
  'This maps to the process definition key.': '映射流程默认值key',
  'Candidate Starter Users': '候选用户',
  'Candidate Starter Groups': '候选组',
  'Candidate Starter Configuration': '候选配置',
  'Specify more than one user as a comma separated list.': '将多个用户指定为逗号分隔的列表',
  'Element must have an unique id.': '元素必须有唯一的 id',
  'Tasklist Configuration': '任务列表配置',
  'Parameter must have a name': '参数必须有名称',
  'Specify more than one group as a comma separated list.': '将多个组指定为逗号分隔的列表'
};
