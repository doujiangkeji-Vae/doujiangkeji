export const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const products = [
  {
    id: 1,
    name: 'Memorion AI记忆助手',
    category: 'AI记忆助手',
    brief: '24小时不间断的AI记忆伙伴，让你永远不用担心遗忘',
    description: 'Memorion 是一款AI驱动的可穿戴记忆伙伴，通过专用硬件全天候记录日常对话，结合语音识别（STT）、自然语言处理（NLP）和大语言模型技术，实现对话的自动转录、智能摘要和语义检索。早上戴上，晚上摘下，中间的每一次重要对话都帮你记住。AI自动帮你总结对话，提炼关键信息。支持自然语言提问，秒级获取答案。本地优先存储，端到端加密，隐私安全有保障。',
    features: ['24小时全天候录音', 'AI智能整理摘要', '自然语言语义检索', '端到端加密保护', 'ESP32-S3开源硬件', '4天超长续航'],
    image: null,
    link: 'http://memorion.me/zh',
    specs: { '芯片': 'ESP32-S3', '续航': '4天连续录音', '防水': '日常防水', '重量': '比硬币更轻', '连接': '蓝牙5.0自动同步', 'AI平台': 'Sayd API' }
  },
  {
    id: 2,
    name: 'DJ-VoiceBadge AI拾音工牌',
    category: 'AI拾音工牌',
    brief: '智能语音采集工牌，实时转录会议内容，AI自动生成纪要',
    description: 'DJ-VoiceBadge 是一款专为职场场景设计的AI拾音工牌。采用专业级降噪麦克风阵列，360°全向拾音，精准过滤环境噪音。内置AI语音识别引擎，支持多语言实时转录，会议结束后自动生成结构化纪要，包含要点摘要、待办事项和关键决策。轻便佩戴，8小时超长续航，Type-C快充。适用于商务会议、客户拜访、培训课堂等场景。',
    features: ['360°降噪拾音', '实时语音转文字', 'AI自动生成会议纪要', '8小时超长续航', 'Type-C快充', '轻便佩戴仅28g'],
    image: null,
    specs: { '拾音': '360°全向降噪麦克风阵列', '续航': '8小时连续录音', '充电': 'Type-C快充，30分钟充50%', '重量': '仅28g', '语言': '中/英/日多语言识别', '存储': '本地32GB + 云端同步' }
  },
  {
    id: 3,
    name: 'Hermes Agent应用',
    category: 'AI智能体',
    brief: '企业级AI智能体平台，可视化工作流编排，多模态AI能力集成',
    description: 'Hermes 是豆姜科技推出的企业级AI Agent应用平台。支持可视化工作流编排，无需代码即可构建复杂的AI自动化流程。内置多模态AI能力，支持文本、语音、图像、视频的智能理解与生成。提供企业知识库接入、私有化部署、多LLM模型切换等核心功能。广泛应用于智能客服、文档处理、数据分析、营销自动化等企业场景。开放API接口，可快速集成到现有业务系统。',
    features: ['可视化工作流编排', '多模态AI能力', '企业知识库接入', '私有化部署', '多LLM模型切换', '开放API接口'],
    image: null,
    specs: { '支持模型': 'DeepSeek / GPT / Claude / GLM', '部署方式': '云端 / 私有化 / 混合云', '知识库': '支持百万级文档', '并发处理': '支持1000+并发', '接口': 'RESTful API / SDK', '安全': '数据加密 / 权限管控' }
  },
  {
    id: 4,
    name: 'DJ-WearOne AI穿戴式设备',
    category: 'AI穿戴式硬件',
    brief: '全天候AI穿戴设备，健康监测+智能助手+语音交互三合一',
    description: 'DJ-WearOne 是豆姜科技推出的新一代AI穿戴式硬件。集成高精度健康传感器，支持心率、血氧、体温、睡眠质量实时监测。内置AI语音助手，支持自然语言交互，可随时查询信息、设置提醒、控制智能家居。采用柔性OLED触控屏，佩戴舒适无感。IP68防水，7天超长续航。支持eSIM独立通话，脱离手机也能使用。',
    features: ['健康实时监测', 'AI语音助手', '柔性OLED屏', 'IP68防水', '7天续航', 'eSIM独立通话'],
    image: null,
    specs: { '屏幕': '1.47英寸柔性OLED', '传感器': '心率/血氧/体温/加速度', '防水': 'IP68', '续航': '7天典型使用', '连接': '蓝牙5.3 / Wi-Fi / eSIM', '重量': '仅32g' }
  },
  {
    id: 5,
    name: 'DJ-Locator AI定位追踪',
    category: 'AI定位追踪',
    brief: 'AI赋能的智能定位追踪系统，支持室内外全场景精准定位',
    description: 'DJ-Locator 是一款AI赋能的智能定位追踪设备。支持GPS/北斗双模卫星定位，结合UWB超宽带室内定位技术，实现室内外无缝切换，定位精度可达厘米级。内置AI轨迹分析引擎，可自动识别异常行为并实时预警。超薄卡片式设计，厚度仅6mm，可轻松放入钱包或贴附于物品上。支持电子围栏、历史轨迹回放、多设备管理等功能。适用于儿童安全、老人看护、资产追踪、宠物防丢等场景。',
    features: ['室内外厘米级定位', 'AI轨迹分析预警', '电子围栏', '超薄6mm设计', '6个月超长待机', '多设备管理'],
    image: null,
    specs: { '室外定位': 'GPS/北斗双模 ≤2.5m', '室内定位': 'UWB超宽带 ≤10cm', '电池': '6000mAh', '待机': '6个月', '尺寸': '86×54×6mm', '防水': 'IP67' }
  },
  {
    id: 6,
    name: 'OpenClaw AI应用平台',
    category: 'OpenClaw应用',
    brief: '开源AI Agent应用平台，快速构建企业级AI智能体',
    description: 'OpenClaw 是豆姜科技推出的开源AI Agent应用平台。基于大语言模型技术，提供可视化AI工作流编排、多模型接入、知识库管理、插件生态等核心能力。企业用户无需编写代码，即可快速构建专属AI智能体，应用于客服问答、文档处理、数据分析、流程自动化等场景。支持私有化部署，数据完全自主可控。已开放API接口，开发者可基于OpenClaw构建自定义AI应用。',
    features: ['可视化工作流编排', '多LLM模型接入', '企业知识库', '插件生态市场', '私有化部署', '开放API'],
    image: null,
    link: 'https://openclaw.com/',
    specs: { '模型支持': 'GPT-4 / Claude / 通义千问 / 文心一言', '部署方式': '云端SaaS / 私有化部署', '知识库': '支持PDF/Word/网页/数据库', 'API': 'RESTful API + WebSocket', '插件': '100+官方插件', '安全': '端到端加密 + RBAC权限' }
  }
];

export const newsArticles = [
  {
    id: 10,
    title: { zh: 'DeepSeek-V4完成国产芯片原生适配，AI算力自主可控迈出关键一步', en: 'DeepSeek-V4 Completes Native Adaptation for Domestic AI Chips' },
    category: { zh: '技术前沿', en: 'Tech Frontier' },
    date: '2026-05-04',
    summary: { zh: 'DeepSeek宣布V4大模型已完成与国内主流AI芯片的原生兼容适配升级，旨在摆脱对海外高端算力芯片的单一依赖。', en: 'DeepSeek announced V4 model has completed native compatibility upgrades with major domestic AI chips, aiming to reduce dependency on overseas high-end computing chips.' },
    content: {
      zh: '2026年5月3日，DeepSeek宣布其V4大模型已完成与国内主流AI芯片的原生兼容适配升级，这是国产AI生态建设的又一里程碑事件。\n\n**核心进展：**\n\n1. **多芯片适配**：V4模型已实现对华为昇腾、寒武纪、海光信息、摩尔线程等国产AI芯片的原生支持。\n\n2. **性能优化**：针对国产芯片架构特点进行了深度优化，推理效率较初始版本提升约40%。\n\n3. **生态完善**：配套推出了统一的推理框架和部署工具链，降低企业迁移成本。\n\n**行业影响：**\n\n- 寒武纪2026年Q1营收28.85亿元，同比增长159.56%，首次实现季度经营现金流为正\n- 海光信息、摩尔线程等国产AI芯片企业悉数实现盈利\n- 国内AI大模型融资总额突破8900亿元\n\n业内人士分析，DeepSeek-V4的国产芯片适配标志着中国AI产业正在加速构建自主可控的技术底座，对整个产业链具有深远意义。',
      en: 'On May 3, 2026, DeepSeek announced its V4 model has completed native compatibility upgrades with major domestic AI chips, marking another milestone in China\'s AI ecosystem development.\n\n**Key Progress:**\n\n1. **Multi-chip Support**: V4 model now natively supports Huawei Ascend, Cambricon, Hygon, and Moore Threads chips.\n\n2. **Performance Optimization**: Deep optimization for domestic chip architectures, improving inference efficiency by approximately 40%.\n\n3. **Ecosystem**: Unified inference framework and deployment toolchain to reduce enterprise migration costs.\n\n**Industry Impact:**\n\n- Cambricon Q1 2026 revenue reached 2.885 billion RMB, up 159.56% YoY\n- Domestic AI chip companies including Hygon and Moore Threads all achieved profitability\n- Total domestic LLM financing exceeded 890 billion RMB'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 11,
    title: { zh: '科技巨头AI投资激增77%，四家合计投入7250亿美元', en: 'Tech Giants Boost AI Investment by 77%, Totaling $725 Billion' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-05-03',
    summary: { zh: '谷歌、亚马逊、微软、Meta计划2026年在AI领域投入合计7250亿美元，微软同比激增192.3%领跑全行业。', en: 'Google, Amazon, Microsoft, and Meta plan to invest a combined $725 billion in AI in 2026, with Microsoft leading at 192.3% YoY growth.' },
    content: {
      zh: '2026年5月，最新数据显示全球科技巨头在AI领域的投入持续加码。\n\n**投资数据：**\n\n- **四巨头合计**：7250亿美元，较去年增长77%\n- **微软**：同比激增192.3%，领跑全行业\n- **亚马逊**：AWS AI基础设施大规模扩建\n- **谷歌**：DeepMind研发投入持续加大\n- **Meta**：AI推荐系统和AR/VR方向重点投入\n\n**行业趋势：**\n\n1. 企业级AI应用采购预算在2026年Q1同比增长超过300%\n2. AI Agent成为新的投资热点，多模态AI应用加速落地\n3. 全球AI人才争夺白热化，顶级AI研究员年薪突破200万美元\n\n**国内对比：**\n\n国内AI大模型领域同样保持高速增长，融资总额突破8900亿元。百度、阿里、字节跳动等头部企业持续加大AI投入，大模型密集迭代。',
      en: 'May 2026 data shows global tech giants continue to increase AI investment.\n\n**Investment Data:**\n\n- **Big Four Total**: $725 billion, up 77% YoY\n- **Microsoft**: 192.3% YoY growth, leading the industry\n- **Amazon**: Large-scale AWS AI infrastructure expansion\n- **Google**: Increased DeepMind R&D investment\n- **Meta**: Focus on AI recommendation systems and AR/VR\n\n**Industry Trends:**\n\n1. Enterprise AI procurement budgets grew over 300% in Q1 2026\n2. AI Agents become new investment hotspot\n3. Global AI talent war intensifies, top researchers exceeding $2M annual salary\n\n**Domestic Comparison:**\n\nChina\'s LLM sector maintains rapid growth with total financing exceeding 890 billion RMB. Baidu, Alibaba, and ByteDance continue to increase AI investment.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 12,
    title: { zh: '人形机器人进入养老院，AI银发助手成行业新焦点', en: 'Humanoid Robots Enter Nursing Homes, AI Elderly Care Assistants Become Industry Focus' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-05-02',
    summary: { zh: '多家AI企业发布面向老年群体的AI产品，基于国产大模型的"银发智能助手"能通过分析老年人日常行为提供健康预警和情感陪伴。', en: 'Multiple AI companies released products for elderly care. "Silver Hair AI Assistant" based on domestic LLMs provides health alerts and emotional companionship.' },
    content: {
      zh: '2026年5月2日，多家人工智能企业发布专门面向老年群体的AI产品，人形机器人进入养老院已成为现实。\n\n**产品亮点：**\n\n1. **银发智能助手**：基于国产大模型开发，能通过分析老年人日常行为模式提供个性化健康建议。\n\n2. **情感陪伴**：AI语音助手具备自然对话能力，可为独居老人提供日常聊天、用药提醒、紧急呼叫等服务。\n\n3. **健康监测**：结合可穿戴设备，实时监测心率、血压、睡眠质量等健康指标，异常时自动预警。\n\n4. **人形机器人**：部分养老院已引入人形机器人，协助老人进行康复训练、日常起居等。\n\n**市场前景：**\n\n中国60岁以上人口已超过3亿，养老产业市场规模预计突破10万亿元。AI+养老被视为下一个万亿级赛道，多家科技企业已开始布局。',
      en: 'On May 2, 2026, multiple AI companies released products for elderly care. Humanoid robots entering nursing homes has become a reality.\n\n**Product Highlights:**\n\n1. **Silver Hair AI Assistant**: Based on domestic LLMs, provides personalized health advice by analyzing elderly daily behavior patterns.\n\n2. **Emotional Companionship**: AI voice assistants with natural conversation capabilities for daily chat, medication reminders, and emergency calls.\n\n3. **Health Monitoring**: Combined with wearable devices for real-time monitoring of heart rate, blood pressure, and sleep quality.\n\n4. **Humanoid Robots**: Some nursing homes have introduced humanoid robots to assist with rehabilitation and daily living.\n\n**Market Outlook:**\n\nChina\'s population aged 60+ exceeds 300 million, with the elderly care market expected to surpass 10 trillion RMB. AI+elderly care is seen as the next trillion-yuan market segment.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 13,
    title: { zh: 'AMD最新AI芯片曝光，统一内存容量突破256GB', en: 'AMD Latest AI Chip Leaked, Unified Memory Exceeds 256GB' },
    category: { zh: '技术前沿', en: 'Tech Frontier' },
    date: '2026-05-01',
    summary: { zh: 'AMD"Gorgon Halo"系列AI芯片曝光，统一内存容量从128GB提升至256GB，面向AI工作站和边缘计算场景。', en: 'AMD "Gorgon Halo" series AI chip leaked, unified memory increased from 128GB to 256GB, targeting AI workstations and edge computing.' },
    content: {
      zh: '2026年5月，AMD最新AI芯片信息曝光，引发行业广泛关注。\n\n**芯片规格：**\n\n- **系列名称**：Gorgon Halo\n- **定位**：现有Strix Halo旗舰APU的后续产品\n- **统一内存**：从128GB提升至256GB\n- **目标场景**：AI工作站、边缘计算、AI PC\n\n**技术亮点：**\n\n1. **大容量统一内存**：256GB统一内存可运行更大的AI模型，无需频繁与外部存储交换数据。\n\n2. **能效优化**：采用最新制程工艺，AI推理功耗较上代降低30%。\n\n3. **生态兼容**：支持主流AI框架（PyTorch、TensorFlow、ONNX），开箱即用。\n\n**行业影响：**\n\nAMD在AI芯片领域的持续发力，将进一步加剧与NVIDIA、Intel的竞争。对于AI硬件企业而言，更多芯片选择意味着更好的性价比和供应链安全。',
      en: 'May 2026, AMD\'s latest AI chip information was leaked, drawing widespread industry attention.\n\n**Chip Specifications:**\n\n- **Series**: Gorgon Halo\n- **Positioning**: Successor to Strix Halo flagship APU\n- **Unified Memory**: Increased from 128GB to 256GB\n- **Target**: AI workstations, edge computing, AI PCs\n\n**Technical Highlights:**\n\n1. **Large Unified Memory**: 256GB enables running larger AI models without frequent data swapping.\n\n2. **Energy Efficiency**: Latest manufacturing process reduces AI inference power consumption by 30%.\n\n3. **Ecosystem**: Supports mainstream AI frameworks (PyTorch, TensorFlow, ONNX) out of the box.\n\n**Industry Impact:**\n\nAMD\'s continued investment in AI chips will intensify competition with NVIDIA and Intel. For AI hardware companies, more chip choices mean better pricing and supply chain security.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 1,
    title: { zh: 'Anthropic发布Claude Opus 4.7，AI大模型竞争进入新阶段', en: 'Anthropic Releases Claude Opus 4.7 — AI Model Competition Enters New Era' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-04-18',
    summary: { zh: 'Anthropic于4月17日正式推出Claude Opus 4.7，在软件工程、金融分析、视觉能力等方面实现全面跃升，与OpenAI GPT系列展开激烈竞争。', en: 'Anthropic officially launched Claude Opus 4.7 on April 17, achieving comprehensive improvements in software engineering, financial analysis, and visual capabilities, intensifying competition with OpenAI\'s GPT series.' },
    content: {
      zh: '2026年4月17日，Anthropic正式推出Claude Opus 4.7，作为Opus 4.6的直接升级版，在多个核心维度实现全面跃升。\n\n**核心升级亮点：**\n\n1. **指令遵循能力大幅提升**：Opus 4.7彻底告别"糊弄式"回答，在复杂指令的精准执行方面表现突出。\n\n2. **软件工程能力突破**：在代码生成、调试和架构设计方面显著增强，部分基准测试中超越GPT-5.4。\n\n3. **视觉能力进化**：新增对复杂图表、技术文档和手写内容的精准识别能力。\n\n4. **专业任务处理**：在金融分析、法律文书、医学报告等专业领域表现大幅提升。\n\n4月17日堪称AI圈超级发布日，OpenAI、Anthropic、昆仑万维、智元机器人集中上新，全球AI格局一夜刷新。业内人士分析，2026年大模型竞争已从单纯的参数规模竞赛转向实际应用效果的比拼。',
      en: 'On April 17, 2026, Anthropic officially launched Claude Opus 4.7 as a direct upgrade to Opus 4.6, achieving comprehensive improvements across multiple core dimensions.\n\n**Key Upgrades:**\n\n1. **Instruction Following**: Opus 4.7 eliminates "evasive" responses, excelling in precise execution of complex instructions.\n\n2. **Software Engineering**: Significant enhancements in code generation, debugging, and architecture design, surpassing GPT-5.4 in some benchmarks.\n\n3. **Visual Capabilities**: New precise recognition abilities for complex charts, technical documents, and handwritten content.\n\n4. **Professional Tasks**: Major improvements in financial analysis, legal documents, and medical reports.\n\nApril 17 was a super release day for the AI industry, with OpenAI, Anthropic, Kunlun Tech, and Zhiyuan Robotics all launching new products simultaneously, reshaping the global AI landscape overnight.'
    },
    source: { zh: '来源：今日头条、搜狐科技', en: 'Source: Toutiao, Sohu Tech' }
  },
  {
    id: 2,
    title: { zh: 'OpenAI发布下一代大模型，AI圈信息密度创历史新高', en: 'OpenAI Releases Next-Gen Model, AI Industry Information Density Hits Record High' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-04-15',
    summary: { zh: 'OpenAI于4月14日正式发布下一代大模型，引发行业震动。2026年AI工程师平均薪资超50万元，人才竞争白热化。', en: 'OpenAI officially released its next-generation model on April 14, sending shockwaves through the industry. Average AI engineer salaries exceed 500K RMB in 2026.' },
    content: {
      zh: '2026年4月14日，OpenAI正式发布下一代大模型，引发行业广泛关注。这是继GPT-5系列之后的又一次重大更新。\n\n**行业影响：**\n\n- **模型能力跃升**：新模型在推理速度、多模态理解和长上下文处理方面均有显著提升。\n\n- **人才市场火热**：据行业报告显示，2026年中国AI工程师平均薪资已超过50万元，顶尖人才年薪可达百万以上。\n\n- **应用场景扩展**：从编程辅助到科学研究，AI大模型的应用场景持续拓宽。\n\n- **竞争格局变化**：OpenAI、Google、Anthropic三足鼎立的格局进一步巩固，国内厂商如DeepSeek、智谱AI等也在快速追赶。\n\n业内人士表示，2026年AI圈的信息密度高得"有点离谱"，几乎每周都有重大发布，标志着AI产业进入高速发展期。',
      en: 'On April 14, 2026, OpenAI officially released its next-generation model, drawing widespread industry attention. This marks another major update following the GPT-5 series.\n\n**Industry Impact:**\n\n- **Capability Leap**: Significant improvements in reasoning speed, multimodal understanding, and long-context processing.\n\n- **Talent Market**: Industry reports show average AI engineer salaries in China exceeding 500K RMB in 2026, with top talent reaching over 1 million.\n\n- **Expanding Applications**: From coding assistance to scientific research, AI model applications continue to broaden.\n\n- **Competitive Landscape**: The triopoly of OpenAI, Google, and Anthropic is further consolidated, while domestic players like DeepSeek and Zhipu AI are rapidly catching up.\n\nIndustry insiders note that AI information density in 2026 is "almost absurdly high," with major releases nearly every week, signaling the industry has entered a period of rapid development.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 3,
    title: { zh: '深圳锁定AI芯片为产业突破口，力争AI终端产值破万亿', en: 'Shenzhen Targets AI Chips as Industrial Breakthrough, Aiming for 1 Trillion RMB AI Terminal Output' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-04-12',
    summary: { zh: '深圳半导体产值已破3000亿元，市政府将AI芯片锁定为产业突破口，力争AI终端产品产量突破1.5亿台。', en: 'Shenzhen\'s semiconductor output exceeds 300 billion RMB. The city targets AI chips as a breakthrough, aiming for 150 million AI terminal devices.' },
    content: {
      zh: '深圳在半导体产业取得重大突破，产值已突破3000亿元。市政府正式将AI芯片锁定为产业突破口，发布雄心勃勃的发展规划。\n\n**核心目标：**\n\n- **产值目标**：力争AI相关产业总产值突破1万亿元\n- **产量目标**：AI终端产品产量突破1.5亿台\n- **产品规划**：在手机、计算机、大模型一体机、可穿戴设备等领域推出50款以上爆款AI终端产品\n\n**产业布局：**\n\n深圳正加速构建从芯片设计到终端应用的完整AI产业链。博通集成等本地芯片企业已推出超低功耗边缘AI芯片，面向智能家居、消费电子及AI原生设备领域。\n\n这一规划将为AI穿戴设备、智能工牌等终端产品创造巨大的市场机遇，也为豆姜科技等AI硬件企业提供了有利的发展环境。',
      en: 'Shenzhen has achieved a major breakthrough in the semiconductor industry, with output exceeding 300 billion RMB. The city government has officially targeted AI chips as an industrial breakthrough, releasing ambitious development plans.\n\n**Core Targets:**\n\n- **Output Goal**: AI-related total industrial output exceeding 1 trillion RMB\n- **Production Goal**: AI terminal device production exceeding 150 million units\n- **Product Planning**: Launching 50+ hit AI terminal products in phones, computers, LLM all-in-one machines, and wearable devices\n\n**Industry Layout:**\n\nShenzhen is accelerating the construction of a complete AI industry chain from chip design to terminal applications. Local chip companies like RiseLink Technologies have launched ultra-low-power edge AI chips for smart home, consumer electronics, and AI-native devices.\n\nThis plan creates enormous market opportunities for AI wearable devices, smart badges, and other terminal products.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 4,
    title: { zh: 'GitHub AI项目爆发：开源大模型教程星标超3万', en: 'GitHub AI Projects Explode: Open-Source LLM Tutorial Surpasses 30K Stars' },
    category: { zh: '技术前沿', en: 'Tech Frontier' },
    date: '2026-04-10',
    summary: { zh: 'GitHub上AI相关项目持续爆发，《动手学大模型》教程项目星标超3.1万，AI屏幕助手omi单日新增944星标。', en: 'AI projects continue to explode on GitHub. The "Hands-on LLM" tutorial surpassed 31K stars, while AI screen assistant omi gained 944 stars in a single day.' },
    content: {
      zh: '2026年4月，GitHub上AI相关开源项目持续爆发，开发者社区热情高涨。\n\n**热门项目：**\n\n- **dive-into-llms**：《动手学大模型》系列编程实践教程，累计获得31,666颗星标，单日新增1,713颗，成为最受欢迎的大模型学习资源之一。\n\n- **omi**：AI屏幕助手项目，单日新增944颗星标，展示了AI在桌面端应用的巨大潜力。\n\n**趋势分析：**\n\n开源AI项目的爆发反映了几个重要趋势：\n1. 大模型技术正在快速民主化，越来越多的开发者能够参与AI应用开发\n2. AI Agent和AI工具类项目成为新的增长点\n3. 中文AI开源社区的活跃度持续提升\n\n对于AI硬件企业而言，开源生态的繁荣意味着更多的开发者和应用场景，有利于构建完整的产品生态。',
      en: 'In April 2026, AI-related open-source projects continue to explode on GitHub, with the developer community showing tremendous enthusiasm.\n\n**Trending Projects:**\n\n- **dive-into-llms**: "Hands-on LLM" programming practice tutorial series, accumulating 31,666 stars with 1,713 new stars in a single day, becoming one of the most popular LLM learning resources.\n\n- **omi**: AI screen assistant project, gaining 944 stars in a single day, demonstrating the enormous potential of AI in desktop applications.\n\n**Trend Analysis:**\n\nThe explosion of open-source AI projects reflects several important trends:\n1. LLM technology is rapidly democratizing, enabling more developers to participate in AI application development\n2. AI Agent and AI tool projects have become new growth drivers\n3. The Chinese AI open-source community continues to gain momentum\n\nFor AI hardware companies, the prosperity of the open-source ecosystem means more developers and application scenarios, facilitating the construction of complete product ecosystems.'
    },
    source: { zh: '来源：GitHub Trending', en: 'Source: GitHub Trending' }
  },
  {
    id: 5,
    title: { zh: '博通集成发布超低功耗边缘AI芯片，面向AI原生设备', en: 'RiseLink Technologies Launches Ultra-Low-Power Edge AI Chip for AI-Native Devices' },
    category: { zh: '技术前沿', en: 'Tech Frontier' },
    date: '2026-04-08',
    summary: { zh: '博通集成携最新一代超低功耗Wi-Fi SoC与边缘AI芯片平台亮相，全面展示智能家居、消费电子及AI原生设备领域的技术实力。', en: 'RiseLink Technologies showcased its latest ultra-low-power Wi-Fi SoC and edge AI chip platform, demonstrating capabilities in smart home, consumer electronics, and AI-native devices.' },
    content: {
      zh: '博通集成（RiseLink Technologies）携其最新一代超低功耗Wi-Fi SoC与Edge AI芯片平台重磅亮相，全面展示其在智能家居、消费电子及AI原生设备领域的技术实力。\n\n**产品亮点：**\n\n- **超低功耗设计**：采用先进制程工艺，功耗较上一代降低50%以上，适合电池供电的AI终端设备。\n\n- **Wi-Fi + AI一体化**：将无线连接与AI推理能力集成在同一芯片上，大幅降低系统成本和设计复杂度。\n\n- **边缘AI推理**：支持在终端设备上本地运行轻量级AI模型，无需依赖云端，响应延迟降至毫秒级。\n\n**应用场景：**\n\n该芯片平台可广泛应用于智能穿戴设备、AI拾音工牌、智能音箱、家居传感器等AI原生终端产品。对于豆姜科技等AI穿戴硬件企业，此类芯片的推出将显著降低产品功耗和成本，加速产品迭代。',
      en: 'RiseLink Technologies showcased its latest generation of ultra-low-power Wi-Fi SoC and Edge AI chip platform, comprehensively demonstrating its technical capabilities in smart home, consumer electronics, and AI-native devices.\n\n**Product Highlights:**\n\n- **Ultra-Low Power**: Advanced manufacturing process reduces power consumption by over 50% compared to the previous generation, suitable for battery-powered AI terminals.\n\n- **Wi-Fi + AI Integration**: Combining wireless connectivity and AI inference on a single chip, significantly reducing system cost and design complexity.\n\n- **Edge AI Inference**: Supports running lightweight AI models locally on terminal devices without cloud dependency, reducing response latency to milliseconds.\n\n**Application Scenarios:**\n\nThe chip platform can be widely applied in AI wearable devices, AI voice badges, smart speakers, home sensors, and other AI-native terminal products. For AI wearable hardware companies, such chips will significantly reduce product power consumption and cost.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 6,
    title: { zh: '全球AI大模型格局：OpenAI、Google、Anthropic三足鼎立', en: 'Global LLM Landscape: OpenAI, Google, Anthropic Form Triopoly' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-04-05',
    summary: { zh: '截至2026年4月，海外AI大模型市场形成三足鼎立格局，国内厂商DeepSeek、智谱AI等快速追赶。', en: 'As of April 2026, the overseas LLM market has formed a triopoly, while domestic players like DeepSeek and Zhipu AI are rapidly catching up.' },
    content: {
      zh: '截至2026年4月，全球AI大模型市场格局已趋于清晰。\n\n**海外三强：**\n\n1. **OpenAI（GPT系列）**：全能型选手，GPT系列一直是大模型的标杆，持续引领行业发展方向。\n\n2. **Google（Gemini系列）**：依托强大的搜索和云计算生态，Gemini在多模态整合方面具有独特优势。\n\n3. **Anthropic（Claude系列）**：以安全和对齐著称，Claude Opus 4.7的发布进一步巩固了其市场地位。\n\n**国内力量：**\n\n- **DeepSeek**：开源路线的代表，V4版本首发适配华为昇腾芯片，推动国产AI基础设施自主可控。\n- **智谱AI**：GLM系列模型在中文理解和生成方面表现优异。\n- **字节跳动**：豆包大模型日均调用量持续增长，在应用层面快速扩张。\n- **MiniMax、月之暗面**等新锐厂商也在各自赛道上发力。\n\n**趋势展望：**\n\n业内人士普遍认为，2026年大模型竞争将从"参数竞赛"转向"应用效果"和"商业化落地"的比拼，AI Agent将成为下一个关键战场。',
      en: 'As of April 2026, the global LLM market landscape has become clear.\n\n**Overseas Triopoly:**\n\n1. **OpenAI (GPT Series)**: The all-rounder, GPT series has always been the benchmark for LLMs, continuously leading industry development.\n\n2. **Google (Gemini Series)**: Leveraging its powerful search and cloud ecosystem, Gemini has unique advantages in multimodal integration.\n\n3. **Anthropic (Claude Series)**: Known for safety and alignment, Claude Opus 4.7\'s release further consolidated its market position.\n\n**Domestic Forces:**\n\n- **DeepSeek**: Representative of the open-source approach, V4 first adapted to Huawei Ascend chips, promoting domestic AI infrastructure autonomy.\n- **Zhipu AI**: GLM series excels in Chinese understanding and generation.\n- **ByteDance**: Doubao model\'s daily call volume continues to grow, rapidly expanding in application.\n- **MiniMax, Moonshot AI** and other emerging players are also making efforts in their respective tracks.\n\n**Outlook:**\n\nIndustry insiders widely believe that 2026 LLM competition will shift from "parameter race" to "application effectiveness" and "commercial deployment," with AI Agents becoming the next key battleground.'
    },
    source: { zh: '来源：今日头条、网易', en: 'Source: Toutiao, NetEase' }
  },
  {
    id: 7,
    title: { zh: 'AI工程师薪资超50万，2026年人才争夺战白热化', en: 'AI Engineer Salaries Exceed 500K RMB — 2026 Talent War Intensifies' },
    category: { zh: '行业动态', en: 'Industry Trends' },
    date: '2026-04-02',
    summary: { zh: '2026年中国AI工程师平均薪资超50万元，顶尖人才年薪百万以上。大模型、AI Agent、具身智能成为最热门方向。', en: 'Average AI engineer salaries in China exceed 500K RMB in 2026, with top talent reaching over 1 million. LLMs, AI Agents, and embodied intelligence are the hottest directions.' },
    content: {
      zh: '2026年AI人才市场持续升温，薪资水平创下新高。\n\n**薪资数据：**\n\n- **平均薪资**：中国AI工程师平均年薪已超过50万元\n- **顶尖人才**：大模型核心研发人员年薪可达100-200万元\n- **涨幅趋势**：相比2025年，AI岗位薪资平均上涨30%以上\n\n**热门方向：**\n\n1. **大模型研发**：算法工程师、模型训练专家需求旺盛\n2. **AI Agent开发**：智能体架构师成为新兴高薪岗位\n3. **具身智能**：机器人+AI的交叉领域人才稀缺\n4. **AI硬件**：边缘AI芯片、AI穿戴设备工程师需求增长\n\n**行业建议：**\n\n对于AI硬件企业而言，吸引和留住人才是关键挑战。建议通过有竞争力的薪酬、股权激励和技术成长空间来构建人才优势。',
      en: 'The AI talent market continues to heat up in 2026, with salary levels reaching new highs.\n\n**Salary Data:**\n\n- **Average Salary**: Chinese AI engineers\' average annual salary exceeds 500K RMB\n- **Top Talent**: Core LLM R&D personnel can earn 1-2 million RMB annually\n- **Growth Trend**: AI position salaries increased over 30% compared to 2025\n\n**Hot Directions:**\n\n1. **LLM R&D**: Strong demand for algorithm engineers and model training specialists\n2. **AI Agent Development**: Agent architects have become a new high-paying role\n3. **Embodied Intelligence**: Talent in the robotics + AI intersection is scarce\n4. **AI Hardware**: Growing demand for edge AI chip and AI wearable device engineers\n\n**Industry Advice:**\n\nFor AI hardware companies, attracting and retaining talent is a key challenge. Competitive compensation, equity incentives, and technical growth opportunities are recommended.'
    },
    source: { zh: '来源：今日头条', en: 'Source: Toutiao' }
  },
  {
    id: 8,
    title: { zh: '豆姜科技发布AI穿戴式硬件产品矩阵', en: 'DouJiang Technology Launches AI Wearable Hardware Product Matrix' },
    category: { zh: '产品动态', en: 'Product Updates' },
    date: '2026-03-28',
    summary: { zh: '豆姜科技正式发布覆盖AI硬件应用全场景的产品矩阵，包含六大产品线。', en: 'DouJiang Technology officially launched its product matrix covering the full spectrum of AI hardware applications.' },
    content: {
      zh: '豆姜科技正式发布覆盖AI硬件应用全场景的产品矩阵，包含六大产品线：\n\n1. **Memorion AI记忆助手**：24小时AI可穿戴记忆伙伴，全天候录音、AI智能整理、自然语言语义检索。\n\n2. **DJ-VoiceBadge AI拾音工牌**：360°降噪拾音，实时语音转文字，AI自动生成会议纪要，8小时续航。\n\n3. **DJ-WearOne AI穿戴式设备**：健康监测+AI语音助手+语音交互三合一，IP68防水，7天续航。\n\n4. **Hermes Agent应用平台**：企业级AI智能体平台，可视化工作流编排，多模态AI能力集成，私有化部署。\n\n5. **DJ-Locator AI定位追踪**：GPS/北斗+UWB室内外厘米级定位，AI轨迹分析预警。\n\n6. **OpenClaw AI应用平台**：开源AI Agent平台，可视化工作流编排，多LLM接入。\n\n公司表示，将致力于通过创新的AI硬件技术，为全球用户提供智能化的产品和解决方案。',
      en: 'DouJiang Technology officially launched its product matrix covering the full spectrum of AI hardware applications:\n\n1. **Memorion AI Memory Assistant**: 24/7 AI wearable memory companion with all-day recording and AI-powered organization.\n\n2. **DJ-VoiceBadge AI Voice Badge**: 360° noise-canceling pickup, real-time speech-to-text, AI auto-generated meeting minutes.\n\n3. **DJ-WearOne AI Wearable Device**: Health monitoring + AI voice assistant + voice interaction, IP68 waterproof, 7-day battery.\n\n4. **Hermes Agent Platform**: Enterprise-grade AI Agent platform with visual workflow orchestration, multimodal AI capabilities, and private deployment.\n\n5. **DJ-Locator AI Tracking**: GPS/BeiDou + UWB indoor/outdoor centimeter-level positioning.\n\n6. **OpenClaw AI Application Platform**: Open-source AI Agent platform with visual workflow orchestration.'
    },
    source: { zh: '来源：豆姜科技官方', en: 'Source: DouJiang Technology Official' }
  },
  {
    id: 9,
    title: { zh: '免责声明：资讯内容来源于网络，侵权联系删除', en: 'Disclaimer: News content is sourced from the internet. Contact us for removal if any infringement.' },
    category: { zh: '法律声明', en: 'Legal Notice' },
    date: '2026-04-20',
    summary: { zh: '本站资讯内容均来源于网络公开信息，仅作行业资讯分享之用，不构成任何投资建议。如有侵权，请联系我们删除。', en: 'News content on this site is sourced from publicly available internet information, shared for industry reference only, and does not constitute investment advice. Contact us for removal if any infringement.' },
    content: {
      zh: '**免责声明**\n\n本站资讯中心所发布的所有文章内容均来源于网络公开信息，仅供行业资讯分享和参考之用，不构成任何投资建议或商业决策依据。\n\n**引用来源包括但不限于：**\n- 今日头条 (toutiao.com)\n- 搜狐科技 (sohu.com)\n- 网易 (163.com)\n- GitHub Trending\n- 各公司官方发布\n\n**版权声明：**\n\n1. 所有引用内容的版权归原作者和出版方所有。\n2. 本站转载内容仅供资讯分享，不用于任何商业目的。\n3. 如有内容侵犯了您的合法权益，请及时与我们联系，我们将在第一时间删除相关内容。\n\n**联系方式：**\n- 邮箱：doujiangkeji@126.com\n- 电话：13247819985',
      en: '**Disclaimer**\n\nAll news articles published on this site are sourced from publicly available internet information, shared for industry reference only, and do not constitute investment advice or commercial decision-making basis.\n\n**Sources include but are not limited to:**\n- Toutiao (toutiao.com)\n- Sohu Tech (sohu.com)\n- NetEase (163.com)\n- GitHub Trending\n- Official company releases\n\n**Copyright Notice:**\n\n1. All referenced content rights belong to the original authors and publishers.\n2. Reproduced content is shared for news purposes only, not for commercial use.\n3. If any content infringes on your legitimate rights, please contact us and we will remove it promptly.\n\n**Contact:**\n- Email: doujiangkeji@126.com\n- Phone: 13247819985'
    },
    source: { zh: '豆姜科技', en: 'DouJiang Technology' }
  }
];

export const teamMembers = [
  { id: 1, name: '余志宇', title: '创始人', avatar: null, bio: '负责产品和技术，喜欢折腾硬件和 AI。' },
  { id: 2, name: '待加入', title: '技术合伙人', avatar: null, bio: '寻找志同道合的技术伙伴，一起做有趣的产品。' },
  { id: 3, name: '待加入', title: '运营合伙人', avatar: null, bio: '寻找有硬件或 AI 产品运营经验的朋友。' }
];

export const milestones = [
  { year: '2026', title: '公司成立', description: '豆姜科技在杭州成立，开始研发 AI 穿戴式硬件产品。' },
  { year: '2026', title: '产品规划', description: '确定首批 6 款产品的开发计划，包括 AI 记忆助手、拾音工牌等。' },
  { year: '2026', title: '网站上线', description: '官方网站 djkj.top 上线，展示产品信息和公司介绍。' }
];

export const mailData = {
  inbox: [
    { id: 1, from: '张明远', subject: '关于 Q2 季度战略规划', preview: '各位好，附件是 Q2 季度战略规划初稿，请在本周五前完成审阅...', date: '2026-04-17 09:30', read: false },
    { id: 2, from: '人力资源部', subject: '2026 年度体检通知', preview: '各位同事，公司将于 5 月组织年度健康体检，请登录内部系统选择...', date: '2026-04-16 14:20', read: false },
    { id: 3, from: '李伟', subject: '边缘计算芯片 V2 技术评审', preview: '技术评审会议定于下周二下午 2 点，请相关同事提前准备材料...', date: '2026-04-16 10:15', read: true },
    { id: 4, from: '市场部', subject: 'MWC 2026 展会方案确认', preview: '展会方案已更新至第三版，请各部门负责人确认展品清单和人员安排...', date: '2026-04-15 16:45', read: true },
    { id: 5, from: 'IT 支持', subject: '系统维护通知', preview: '本周六凌晨 2:00-6:00 将进行服务器维护，届时内部系统将暂停服务...', date: '2026-04-15 09:00', read: true },
    { id: 6, from: '王芳', subject: '团建活动方案投票', preview: '下月团建活动有三个方案供大家投票选择：方案一...方案二...方案三...', date: '2026-04-14 17:30', read: true }
  ],
  sent: [
    { id: 101, to: '全体员工', subject: '关于 B 轮融资的内部通知', preview: '各位同事，很高兴通知大家公司已完成 B 轮融资...', date: '2026-04-10 11:00' },
    { id: 102, to: '李伟', subject: 'Re: 边缘计算芯片 V2 技术评审', preview: '收到，我会提前准备好技术方案文档...', date: '2026-04-16 11:00' },
    { id: 103, to: '市场部', subject: 'Re: MWC 2026 展会方案确认', preview: '展品清单已确认，技术演示部分需要增加一个 Demo...', date: '2026-04-15 17:00' }
  ]
};
