/* Qualixx demo – UI translations (en → ko / ja / zh). Only interface text is translated; content people enter is shown as written. */
window.QX_I18N = (function () {
  const DICT = {
 "1. General information": [
  "1. 일반 정보",
  "1. 一般情報",
  "1. 基本信息"
 ],
 "1. Overview and intended use": [
  "1. 개요 및 사용목적",
  "1. 概要と使用目的",
  "1. 概述和预期用途"
 ],
 "2. Risk management plan": [
  "2. 위험관리 계획",
  "2. リスクマネジメント計画",
  "2. 风险管理计划"
 ],
 "3. Safety characteristics": [
  "3. 안전 관련 특성",
  "3. 安全に関する特性",
  "3. 安全特征"
 ],
 "4. Risk analysis, evaluation and control": [
  "4. 위험 분석, 평가 및 통제",
  "4. リスク分析・評価・コントロール",
  "4. 风险分析、评价和控制"
 ],
 "5. Benefit-risk analysis": [
  "5. 이익-위험 분석",
  "5. ベネフィット・リスク分析",
  "5. 受益-风险分析"
 ],
 "6. Overall residual risk": [
  "6. 전체 잔여위험",
  "6. 全体的な残留リスク",
  "6. 综合剩余风险"
 ],
 "7. Risk management review": [
  "7. 위험관리 검토",
  "7. リスクマネジメントレビュー",
  "7. 风险管理评审"
 ],
 "AI & data": [
  "AI 및 데이터",
  "AI・データ",
  "AI 与数据"
 ],
 "About Qualixx": [
  "Qualixx 정보",
  "Qualixx について",
  "关于 Qualixx"
 ],
 "Accept": [
  "승인",
  "承認",
  "接受"
 ],
 "Acceptability policy": [
  "수용 가능성 정책",
  "受容可能性の方針",
  "可接受性方针"
 ],
 "Acceptable": [
  "수용 가능",
  "受容可能",
  "可接受"
 ],
 "Accepted": [
  "승인됨",
  "承認済み",
  "已接受"
 ],
 "Acknowledged": [
  "확인 완료",
  "確認済み",
  "已确认"
 ],
 "Acknowledgement recorded": [
  "확인이 기록되었습니다",
  "確認を記録しました",
  "已记录确认"
 ],
 "Acoustic or vibration energy": [
  "음향 또는 진동 에너지",
  "音響・振動エネルギー",
  "声能或振动能"
 ],
 "Action": [
  "조치",
  "対応",
  "操作"
 ],
 "Activity": [
  "활동",
  "アクティビティ",
  "活动"
 ],
 "Add": [
  "추가",
  "追加",
  "添加"
 ],
 "Add a comment when returning": [
  "반려할 때는 의견을 입력하세요",
  "差し戻す場合はコメントを入力してください",
  "退回时请填写意见"
 ],
 "Add authorization": [
  "허가 추가",
  "承認・認証を追加",
  "添加注册信息"
 ],
 "Add control measure": [
  "위험통제 조치 추가",
  "リスクコントロール手段を追加",
  "添加控制措施"
 ],
 "Add hazard": [
  "위해요인 추가",
  "ハザードを追加",
  "添加危险源"
 ],
 "Add hazards in Risk Analysis first.": [
  "먼저 위험 분석에서 위해요인을 추가하세요.",
  "まずリスク分析でハザードを追加してください。",
  "请先在风险分析中添加危险源。"
 ],
 "Add objective": [
  "목표 추가",
  "目標を追加",
  "添加目标"
 ],
 "Add product": [
  "제품 추가",
  "製品を追加",
  "添加产品"
 ],
 "All": [
  "전체",
  "すべて",
  "全部"
 ],
 "All Documents": [
  "전체 문서",
  "すべての文書",
  "全部文件"
 ],
 "All Products": [
  "전체 제품",
  "すべての製品",
  "全部产品"
 ],
 "All authorizations": [
  "전체 허가 목록",
  "すべての承認・認証",
  "全部注册信息"
 ],
 "All conditions must be met before approval.": [
  "승인 전에 모든 조건을 충족해야 합니다.",
  "承認前にすべての条件を満たす必要があります。",
  "批准前必须满足所有条件。"
 ],
 "Answer": [
  "답변",
  "回答",
  "回答"
 ],
 "Approval": [
  "승인",
  "承認",
  "批准"
 ],
 "Approve": [
  "승인",
  "承認",
  "批准"
 ],
 "Approve with e-signature": [
  "전자서명으로 승인",
  "電子署名で承認",
  "电子签名批准"
 ],
 "Approve with electronic signature": [
  "전자서명으로 승인",
  "電子署名で承認",
  "电子签名批准"
 ],
 "Approved": [
  "승인됨",
  "承認済み",
  "已批准"
 ],
 "Approved by": [
  "승인자",
  "承認者",
  "批准人"
 ],
 "Approver": [
  "승인자",
  "承認者",
  "批准人"
 ],
 "Are there risks to consider at disposal?": [
  "폐기 시 고려할 위험이 있습니까?",
  "廃棄時に考慮すべきリスクはありますか?",
  "处置时是否存在需要考虑的风险?"
 ],
 "At least (≥)": [
  "이상 (≥)",
  "以上 (≥)",
  "不低于 (≥)"
 ],
 "At least one hazard identified": [
  "위해요인 1개 이상 식별",
  "ハザードを1件以上特定",
  "至少识别一个危险源"
 ],
 "At most (≤)": [
  "이하 (≤)",
  "以下 (≤)",
  "不高于 (≤)"
 ],
 "At risk": [
  "위험",
  "要注意",
  "存在风险"
 ],
 "Audit Trail": [
  "감사추적",
  "監査証跡",
  "审计追踪"
 ],
 "Audit trail": [
  "감사추적",
  "監査証跡",
  "审计追踪"
 ],
 "Australia": [
  "호주",
  "オーストラリア",
  "澳大利亚"
 ],
 "Author": [
  "작성자",
  "作成者",
  "编写人"
 ],
 "Authority": [
  "규제기관",
  "規制当局",
  "监管机构"
 ],
 "Authority · pathway": [
  "규제기관 · 경로",
  "規制当局・申請区分",
  "监管机构 · 途径"
 ],
 "Authorization deleted": [
  "허가 정보가 삭제되었습니다",
  "承認・認証情報を削除しました",
  "注册信息已删除"
 ],
 "Authorizations": [
  "국가별 허가",
  "国別承認・認証",
  "各国注册"
 ],
 "Auto": [
  "자동",
  "自動",
  "自动"
 ],
 "Available": [
  "사용 가능",
  "利用可能",
  "可用"
 ],
 "Benefit-risk analysis": [
  "이익-위험 분석",
  "ベネフィット・リスク分析",
  "受益-风险分析"
 ],
 "Benefit-risk analysis recorded for unacceptable residual risks": [
  "수용 불가 잔여위험에 대한 이익-위험 분석 기록",
  "受容できない残留リスクのベネフィット・リスク分析を記録",
  "已记录不可接受剩余风险的受益-风险分析"
 ],
 "Bias in training data": [
  "학습 데이터의 편향",
  "学習データの偏り",
  "训练数据偏差"
 ],
 "Biological & chemical": [
  "생물학적·화학적",
  "生物学的・化学的",
  "生物与化学"
 ],
 "Brazil": [
  "브라질",
  "ブラジル",
  "巴西"
 ],
 "Build ISO 14971 risk files step by step — from hazard analysis to an approved report.": [
  "위해요인 분석부터 승인된 보고서까지, ISO 14971 위험관리 파일을 단계별로 작성합니다.",
  "ハザード分析から承認済み報告書まで、ISO 14971 リスクマネジメントファイルを段階的に作成します。",
  "从危险源分析到批准的报告,逐步建立 ISO 14971 风险管理文档。"
 ],
 "By": [
  "작성자",
  "担当者",
  "人员"
 ],
 "Canada": [
  "캐나다",
  "カナダ",
  "加拿大"
 ],
 "Cancel": [
  "취소",
  "キャンセル",
  "取消"
 ],
 "Catastrophic": [
  "치명적",
  "致命的",
  "灾难性"
 ],
 "Category": [
  "분류",
  "分類",
  "类别"
 ],
 "Change": [
  "변경 내용",
  "変更内容",
  "变更内容"
 ],
 "Change withdrawn": [
  "변경이 철회되었습니다",
  "変更を取り下げました",
  "变更已撤回"
 ],
 "Changes in progress": [
  "진행 중인 변경",
  "進行中の変更",
  "进行中的变更"
 ],
 "Changes vs current revision": [
  "현재 개정본 대비 변경 사항",
  "現行版との差分",
  "与当前版本的差异"
 ],
 "Chat": [
  "채팅",
  "チャット",
  "聊天"
 ],
 "Chat or email your team": [
  "팀원과 채팅하거나 이메일 보내기",
  "チームとチャット・メール",
  "与团队聊天或发送邮件"
 ],
 "China": [
  "중국",
  "中国",
  "中国"
 ],
 "Click a cell to switch acceptable / unacceptable. The default (severity × probability ≤ 6) is an example — align it with your policy. Numbers show initial risks in each cell.": [
  "칸을 클릭하면 수용 가능/불가가 바뀝니다. 기본값(심각도 × 발생가능성 ≤ 6)은 예시이므로 회사 정책에 맞게 조정하세요. 숫자는 각 칸의 초기 위험 수입니다.",
  "セルをクリックすると受容可能/不可が切り替わります。既定値(重大度 × 発生確率 ≤ 6)は例です。自社の方針に合わせてください。数字は各セルの初期リスク数です。",
  "点击单元格可切换可接受/不可接受。默认值(严重度 × 概率 ≤ 6)仅为示例,请按贵公司方针调整。数字表示各单元格中的初始风险数。"
 ],
 "Close": [
  "닫기",
  "閉じる",
  "关闭"
 ],
 "Comment": [
  "의견",
  "コメント",
  "意见"
 ],
 "Compare with current revision": [
  "현재 개정본과 비교",
  "現行版と比較",
  "与当前版本比较"
 ],
 "Complete all conditions first": [
  "먼저 모든 조건을 완료하세요",
  "先にすべての条件を満たしてください",
  "请先完成所有条件"
 ],
 "Complete risk management file": [
  "위험관리 파일 작성 완료하기",
  "リスクマネジメントファイルを完成させる",
  "完成风险管理文档"
 ],
 "Completeness": [
  "작성 진척도",
  "完成度",
  "完成度"
 ],
 "Completion": [
  "완료율",
  "完了率",
  "完成率"
 ],
 "Conclusion": [
  "결론",
  "結論",
  "结论"
 ],
 "Confirm": [
  "확인",
  "確認",
  "确认"
 ],
 "Consider control options in priority order: inherently safe design → protective measures → information for safety. Link verification evidence and re-evaluate residual risk.": [
  "위험통제 방법은 본질적 안전 설계 → 방호 조치 → 안전 정보 순으로 검토하세요. 검증 근거를 연결하고 잔여위험을 다시 평가합니다.",
  "リスクコントロールは、本質的安全設計 → 防護手段 → 安全情報の優先順位で検討してください。検証の根拠を紐付け、残留リスクを再評価します。",
  "请按以下优先顺序考虑控制方案:固有安全设计 → 防护措施 → 安全信息。关联验证证据并重新评价剩余风险。"
 ],
 "Considering all residual risks together, is the overall residual risk acceptable relative to the medical benefit?": [
  "모든 잔여위험을 종합할 때, 전체 잔여위험이 의료적 이익에 비해 수용 가능합니까?",
  "すべての残留リスクを総合して、全体的な残留リスクは医療上のベネフィットに対して受容可能ですか?",
  "综合考虑所有剩余风险,综合剩余风险相对于医疗受益是否可接受?"
 ],
 "Control measure": [
  "위험통제 조치",
  "リスクコントロール手段",
  "控制措施"
 ],
 "Controlled by information for safety only. Confirm that inherently safe design and protective measures were considered first (§7.1 priority).": [
  "안전 정보만으로 통제하고 있습니다. 본질적 안전 설계와 방호 조치를 먼저 검토했는지 확인하세요(§7.1 우선순위).",
  "安全情報のみでコントロールしています。本質的安全設計と防護手段を先に検討したことを確認してください(§7.1 の優先順位)。",
  "仅通过安全信息进行控制。请确认已优先考虑固有安全设计和防护措施(§7.1 优先顺序)。"
 ],
 "Controlled copy": [
  "관리본",
  "管理版",
  "受控副本"
 ],
 "Controls verified": [
  "검증된 통제 조치",
  "検証済みのコントロール",
  "已验证的控制措施"
 ],
 "Country / region, authority, pathway, number and validity.": [
  "국가/지역, 규제기관, 허가 경로, 번호, 유효기간.",
  "国・地域、規制当局、申請区分、番号、有効期間。",
  "国家/地区、监管机构、途径、编号和有效期。"
 ],
 "Create": [
  "만들기",
  "作成",
  "创建"
 ],
 "Create a risk management file (or load the sample) and follow the steps: Overview → Plan → Safety characteristics → Risk analysis → Risk control → Review & approval.": [
  "위험관리 파일을 만들거나 샘플을 불러온 뒤, 개요 → 계획 → 안전 특성 → 위험 분석 → 위험 통제 → 검토·승인 순서로 진행하세요.",
  "リスクマネジメントファイルを作成(またはサンプルを読み込み)し、概要 → 計画 → 安全特性 → リスク分析 → リスクコントロール → レビュー・承認の順に進めます。",
  "创建风险管理文档(或载入示例),然后按以下步骤进行:概述 → 计划 → 安全特征 → 风险分析 → 风险控制 → 评审与批准。"
 ],
 "Create and manage ISO 14971 risk management files per product.": [
  "제품별 ISO 14971 위험관리 파일을 만들고 관리합니다.",
  "製品ごとに ISO 14971 リスクマネジメントファイルを作成・管理します。",
  "按产品创建和管理 ISO 14971 风险管理文档。"
 ],
 "Create draft Rev.00": [
  "Rev.00 초안 만들기",
  "Rev.00 の草案を作成",
  "创建 Rev.00 草稿"
 ],
 "Create, review, approve, distribute and withdraw controlled documents (ISO 13485 §4.2.4).": [
  "관리 문서를 작성·검토·승인·배포·회수합니다(ISO 13485 §4.2.4).",
  "管理文書を作成・レビュー・承認・配布・回収します(ISO 13485 §4.2.4)。",
  "编制、评审、批准、分发和撤回受控文件(ISO 13485 §4.2.4)。"
 ],
 "Critical": [
  "중대",
  "重大",
  "严重"
 ],
 "Current revision": [
  "현재 개정본",
  "現行版",
  "当前版本"
 ],
 "Current value": [
  "현재값",
  "現在値",
  "当前值"
 ],
 "Cybersecurity": [
  "사이버보안",
  "サイバーセキュリティ",
  "网络安全"
 ],
 "Dashboard → Work Process → Risk Management.": [
  "대시보드 → 업무 프로세스 → 위험관리.",
  "ダッシュボード → 業務プロセス → リスクマネジメント。",
  "仪表板 → 工作流程 → 风险管理。"
 ],
 "Data": [
  "데이터",
  "データ",
  "数据"
 ],
 "Data loss or corruption": [
  "데이터 손실 또는 손상",
  "データの消失・破損",
  "数据丢失或损坏"
 ],
 "Data tampering": [
  "데이터 변조",
  "データ改ざん",
  "数据篡改"
 ],
 "Death": [
  "사망",
  "死亡",
  "死亡"
 ],
 "Decision": [
  "결정",
  "判定",
  "决定"
 ],
 "Delete": [
  "삭제",
  "削除",
  "删除"
 ],
 "Delete product": [
  "제품 삭제",
  "製品を削除",
  "删除产品"
 ],
 "Demo": [
  "데모",
  "デモ",
  "演示"
 ],
 "Demo account": [
  "데모 계정",
  "デモアカウント",
  "演示账户"
 ],
 "Demo: you can assign yourself to try every step. In the live service an author cannot approve their own revision.": [
  "데모: 모든 단계를 직접 해볼 수 있도록 본인을 지정할 수 있습니다. 실제 서비스에서는 작성자가 자기 개정본을 승인할 수 없습니다.",
  "デモ:すべてのステップを試せるよう自分を指定できます。本番サービスでは作成者が自分の改訂を承認することはできません。",
  "演示:可将自己指定为各环节人员以体验全部步骤。正式服务中,编写人不能批准自己的修订。"
 ],
 "Denial of service (loss of availability)": [
  "서비스 거부(가용성 상실)",
  "サービス妨害(可用性の喪失)",
  "拒绝服务(可用性丧失)"
 ],
 "Design and development procedure:": [
  "설계 및 개발 절차서:",
  "設計・開発手順書:",
  "设计和开发程序:"
 ],
 "Device class": [
  "등급",
  "クラス分類",
  "器械类别"
 ],
 "Device class / SW safety class": [
  "등급 / SW 안전등급",
  "クラス分類 / SW 安全クラス",
  "器械类别 / 软件安全级别"
 ],
 "Direct messages with your team. Demo: messages stay in this browser and are not delivered.": [
  "팀원과 1:1 메시지를 주고받습니다. 데모에서는 메시지가 이 브라우저에만 남고 실제로 전송되지 않습니다.",
  "チームとのダイレクトメッセージ。デモではメッセージはこのブラウザにのみ保存され、送信されません。",
  "与团队成员私信。演示中消息仅保存在本浏览器,不会实际发送。"
 ],
 "Direction": [
  "기준 방향",
  "判定方向",
  "方向"
 ],
 "Disclosed residual risks": [
  "공개할 잔여위험",
  "開示する残留リスク",
  "需披露的剩余风险"
 ],
 "Doc ID": [
  "문서번호",
  "文書番号",
  "文件编号"
 ],
 "Document": [
  "문서",
  "文書",
  "文件"
 ],
 "Document Control": [
  "문서관리",
  "文書管理",
  "文件控制"
 ],
 "Document ID": [
  "문서번호",
  "文書番号",
  "文件编号"
 ],
 "Document information": [
  "문서 정보",
  "文書情報",
  "文件信息"
 ],
 "Document made obsolete": [
  "문서를 폐기했습니다",
  "文書を廃止しました",
  "文件已作废"
 ],
 "Document no.": [
  "문서번호",
  "文書番号",
  "文件编号"
 ],
 "Does it contain software, or is the software itself a medical device?": [
  "소프트웨어를 포함하거나, 소프트웨어 자체가 의료기기입니까?",
  "ソフトウェアを含む、またはソフトウェア自体が医療機器ですか?",
  "是否包含软件,或软件本身即为医疗器械?"
 ],
 "Does it deliver energy or substances to the body, or remove them?": [
  "인체에 에너지나 물질을 전달하거나 제거합니까?",
  "身体にエネルギーや物質を供給、または除去しますか?",
  "是否向人体输送或从人体移除能量或物质?"
 ],
 "Does it include AI / machine-learning functions?": [
  "AI/머신러닝 기능을 포함합니까?",
  "AI/機械学習の機能を含みますか?",
  "是否包含 AI/机器学习功能?"
 ],
 "Does it measure, or inform diagnostic or therapeutic decisions?": [
  "측정을 하거나 진단·치료 결정에 정보를 제공합니까?",
  "測定を行う、または診断・治療の判断に情報を提供しますか?",
  "是否进行测量,或为诊断/治疗决策提供信息?"
 ],
 "Does it need maintenance or calibration?": [
  "유지보수나 교정이 필요합니까?",
  "保守や校正が必要ですか?",
  "是否需要维护或校准?"
 ],
 "Does it require user training or special skills?": [
  "사용자 교육이나 특별한 기술이 필요합니까?",
  "ユーザー教育や特別な技能が必要ですか?",
  "是否需要用户培训或特殊技能?"
 ],
 "Draft": [
  "초안",
  "草案",
  "草稿"
 ],
 "Draft saved": [
  "초안을 저장했습니다",
  "草案を保存しました",
  "草稿已保存"
 ],
 "Due": [
  "기한",
  "期限",
  "截止日期"
 ],
 "Due date": [
  "기한",
  "期限",
  "截止日期"
 ],
 "Edit": [
  "편집",
  "編集",
  "编辑"
 ],
 "Effective": [
  "시행",
  "有効",
  "生效"
 ],
 "Effective date": [
  "시행일",
  "発効日",
  "生效日期"
 ],
 "Effectiveness": [
  "유효성",
  "有効性",
  "有效性"
 ],
 "Effectiveness verified": [
  "유효성 검증 완료",
  "有効性検証済み",
  "有效性已验证"
 ],
 "Effectiveness verified for all control measures": [
  "모든 통제 조치의 유효성 검증 완료",
  "すべてのコントロール手段の有効性を検証",
  "所有控制措施的有效性已验证"
 ],
 "Electrical energy (leakage current, shock)": [
  "전기 에너지(누설전류, 감전)",
  "電気エネルギー(漏れ電流、感電)",
  "电能(漏电流、电击)"
 ],
 "Electromagnetic interference": [
  "전자파 간섭",
  "電磁干渉",
  "电磁干扰"
 ],
 "Email": [
  "이메일",
  "メール",
  "邮件"
 ],
 "Energy": [
  "에너지",
  "エネルギー",
  "能量"
 ],
 "Environment": [
  "환경",
  "環境",
  "环境"
 ],
 "European Union": [
  "유럽연합",
  "欧州連合",
  "欧盟"
 ],
 "Every save and approval is recorded in time order. In the demo the trail stays in this browser.": [
  "모든 저장과 승인이 시간 순서대로 기록됩니다. 데모에서는 이 브라우저에만 남습니다.",
  "すべての保存と承認が時系列で記録されます。デモではこのブラウザにのみ保存されます。",
  "每次保存和批准都按时间顺序记录。演示中记录仅保存在本浏览器。"
 ],
 "Every unacceptable initial risk has a control measure": [
  "수용 불가 초기 위험마다 통제 조치 있음",
  "受容できない初期リスクすべてにコントロール手段あり",
  "每个不可接受的初始风险都有控制措施"
 ],
 "Example": [
  "예시",
  "例",
  "示例"
 ],
 "Example objectives": [
  "예시 목표",
  "目標の例",
  "示例目标"
 ],
 "Example text": [
  "예시 문구",
  "例文",
  "示例文本"
 ],
 "Expired": [
  "만료",
  "期限切れ",
  "已过期"
 ],
 "Expiry": [
  "만료일",
  "有効期限",
  "到期日"
 ],
 "Expiry / renewal": [
  "만료일 / 갱신",
  "有効期限 / 更新",
  "到期 / 续期"
 ],
 "Expiry tracking": [
  "만료일 추적",
  "有効期限の追跡",
  "到期跟踪"
 ],
 "Explain why the medical benefit outweighs this residual risk": [
  "의료적 이익이 이 잔여위험보다 큰 이유를 설명하세요",
  "医療上のベネフィットがこの残留リスクを上回る理由を記載してください",
  "请说明医疗受益为何大于该剩余风险"
 ],
 "False negative (missed finding)": [
  "위음성(소견 누락)",
  "偽陰性(所見の見落とし)",
  "假阴性(漏检)"
 ],
 "False positive (over-detection)": [
  "위양성(과검출)",
  "偽陽性(過検出)",
  "假阳性(过检)"
 ],
 "File deleted": [
  "파일을 삭제했습니다",
  "ファイルを削除しました",
  "文档已删除"
 ],
 "Fill in": [
  "작성하기",
  "入力する",
  "填写"
 ],
 "Flow": [
  "흐름",
  "フロー",
  "流程"
 ],
 "For software, the label is shown on the product's About screen and in the IFU.": [
  "소프트웨어는 제품의 정보(About) 화면과 사용설명서에 라벨을 표시합니다.",
  "ソフトウェアの場合、ラベルは製品の情報(About)画面と取扱説明書に表示されます。",
  "对于软件,标签显示在产品的\"关于\"界面和使用说明书中。"
 ],
 "Foreseeable misuse": [
  "예측 가능한 오사용",
  "予見可能な誤使用",
  "可预见的误用"
 ],
 "Form": [
  "서식",
  "様式",
  "表单"
 ],
 "Forms": [
  "서식",
  "様式",
  "表单"
 ],
 "Forms and records": [
  "서식 및 기록",
  "様式と記録",
  "表单和记录"
 ],
 "Forms under this procedure": [
  "이 절차서의 서식",
  "この手順書の様式",
  "本程序下的表单"
 ],
 "Frequent": [
  "빈번",
  "頻繁",
  "频繁"
 ],
 "From": [
  "요청자",
  "依頼元",
  "来自"
 ],
 "Generated from your entries. Use Print to save as PDF.": [
  "입력한 내용으로 생성됩니다. 인쇄 기능으로 PDF로 저장하세요.",
  "入力内容から生成されます。印刷から PDF として保存できます。",
  "根据您的输入生成。可通过打印另存为 PDF。"
 ],
 "Go to Risk Analysis": [
  "위험 분석으로 이동",
  "リスク分析へ移動",
  "前往风险分析"
 ],
 "Harm": [
  "위해",
  "危害",
  "伤害"
 ],
 "Hazard": [
  "위해요인",
  "ハザード",
  "危险源"
 ],
 "Hazardous situation": [
  "위험상황",
  "危険状態",
  "危险情况"
 ],
 "Hazards": [
  "위해요인",
  "ハザード",
  "危险源"
 ],
 "Hazards identified": [
  "식별된 위해요인",
  "特定されたハザード",
  "已识别危险源"
 ],
 "Help": [
  "도움말",
  "ヘルプ",
  "帮助"
 ],
 "Holder": [
  "허가 보유자",
  "承認取得者",
  "持证人"
 ],
 "How the hazard leads to a hazardous situation": [
  "위해요인이 위험상황으로 이어지는 과정",
  "ハザードが危険状態に至る経緯",
  "危险源如何导致危险情况"
 ],
 "How this demo works.": [
  "이 데모 사용 방법.",
  "このデモの使い方。",
  "本演示的使用方法。"
 ],
 "I have read and understood": [
  "읽고 이해했습니다",
  "読んで理解しました",
  "我已阅读并理解"
 ],
 "ISO 13485 clause": [
  "ISO 13485 조항",
  "ISO 13485 箇条",
  "ISO 13485 条款"
 ],
 "ISO 13485 clauses": [
  "ISO 13485 조항",
  "ISO 13485 箇条",
  "ISO 13485 条款"
 ],
 "ISO 14971 completion conditions": [
  "ISO 14971 완료 조건",
  "ISO 14971 完了条件",
  "ISO 14971 完成条件"
 ],
 "ISO 14971 files for this product.": [
  "이 제품의 ISO 14971 파일입니다.",
  "この製品の ISO 14971 ファイルです。",
  "本产品的 ISO 14971 文档。"
 ],
 "Identification of this software. Use it in your software validation and when contacting support.": [
  "이 소프트웨어의 식별 정보입니다. 소프트웨어 밸리데이션과 고객지원 문의 시 사용하세요.",
  "本ソフトウェアの識別情報です。ソフトウェアバリデーションやサポートへの問い合わせ時にご利用ください。",
  "本软件的标识信息。可用于软件确认及联系技术支持。"
 ],
 "Implementation": [
  "이행",
  "実施",
  "实施"
 ],
 "Implementation verified": [
  "이행 검증 완료",
  "実施検証済み",
  "实施已验证"
 ],
 "Implementation verified for all control measures": [
  "모든 통제 조치의 이행 검증 완료",
  "すべてのコントロール手段の実施を検証",
  "所有控制措施的实施已验证"
 ],
 "Improbable": [
  "거의 없음",
  "ほとんどない",
  "极不可能"
 ],
 "In Change": [
  "개정 중",
  "改訂中",
  "变更中"
 ],
 "In Review": [
  "검토 중",
  "レビュー中",
  "评审中"
 ],
 "In change": [
  "개정 중",
  "改訂中",
  "变更中"
 ],
 "In development": [
  "개발 중",
  "開発中",
  "开发中"
 ],
 "In preparation": [
  "준비 중",
  "準備中",
  "准备中"
 ],
 "In the live service, the approved PDF/Word file is attached by Qualixx in the Console and opened here. Revisions made in Qualixx show their content here.": [
  "실제 서비스에서는 퀄릭스가 콘솔에서 승인된 PDF/Word 파일을 첨부하며, 여기에서 열람합니다. Qualixx에서 작성한 개정본은 내용이 여기에 표시됩니다.",
  "本番サービスでは、承認済みの PDF/Word ファイルを Qualixx がコンソールで添付し、ここで閲覧できます。Qualixx で作成した改訂はここに内容が表示されます。",
  "正式服务中,已批准的 PDF/Word 文件由 Qualixx 在控制台上传,并在此处打开。在 Qualixx 中编写的修订内容会显示在此处。"
 ],
 "Inaccurate measurement or output": [
  "부정확한 측정 또는 출력",
  "不正確な測定・出力",
  "测量或输出不准确"
 ],
 "Inadequate labelling or instructions for use": [
  "부적절한 표시기재 또는 사용설명서",
  "不適切な表示・取扱説明書",
  "标签或使用说明不充分"
 ],
 "Inconvenience or temporary discomfort, no injury": [
  "불편함 또는 일시적 불쾌감, 부상 없음",
  "不便または一時的な不快感、傷害なし",
  "不便或暂时不适,无伤害"
 ],
 "Incorrect email or password.": [
  "이메일 또는 비밀번호가 올바르지 않습니다.",
  "メールアドレスまたはパスワードが正しくありません。",
  "邮箱或密码错误。"
 ],
 "Incorrect password": [
  "비밀번호가 올바르지 않습니다",
  "パスワードが正しくありません",
  "密码错误"
 ],
 "Incorrect result displayed": [
  "잘못된 결과 표시",
  "誤った結果の表示",
  "显示错误结果"
 ],
 "Information": [
  "정보",
  "情報",
  "信息"
 ],
 "Information for safety": [
  "안전 정보",
  "安全情報",
  "安全信息"
 ],
 "Inherently safe design": [
  "본질적 안전 설계",
  "本質的安全設計",
  "固有安全设计"
 ],
 "Initial": [
  "초기",
  "初期",
  "初始"
 ],
 "Initial issue": [
  "제정",
  "初版発行",
  "首次发布"
 ],
 "Initial risk": [
  "초기 위험",
  "初期リスク",
  "初始风险"
 ],
 "Initial risk distribution": [
  "초기 위험 분포",
  "初期リスクの分布",
  "初始风险分布"
 ],
 "Initial unacc.": [
  "초기 수용불가",
  "初期受容不可",
  "初始不可接受"
 ],
 "Injury or impairment requiring medical intervention": [
  "의료적 처치가 필요한 부상 또는 장애",
  "医療的介入を要する傷害または障害",
  "需要医疗干预的伤害或损害"
 ],
 "Inputs": [
  "입력",
  "インプット",
  "输入"
 ],
 "Instruction": [
  "지침서",
  "指示書",
  "作业指导书"
 ],
 "Instructions": [
  "지침서",
  "指示書",
  "作业指导书"
 ],
 "Intended use": [
  "사용목적",
  "使用目的",
  "预期用途"
 ],
 "Intended users": [
  "사용자",
  "想定使用者",
  "预期用户"
 ],
 "Is it connected to a network or does it exchange data?": [
  "네트워크에 연결되거나 데이터를 주고받습니까?",
  "ネットワークに接続する、またはデータを交換しますか?",
  "是否联网或交换数据?"
 ],
 "Is it supplied sterile, or must the user sterilize or clean it?": [
  "멸균 상태로 공급되거나, 사용자가 멸균·세척해야 합니까?",
  "滅菌済みで供給される、または使用者が滅菌・洗浄する必要がありますか?",
  "是否以无菌状态提供,或需用户灭菌/清洁?"
 ],
 "Is it used together with other devices, medicines or systems?": [
  "다른 기기, 의약품 또는 시스템과 함께 사용합니까?",
  "他の機器、医薬品、システムと併用しますか?",
  "是否与其他器械、药品或系统一起使用?"
 ],
 "Item": [
  "항목",
  "項目",
  "项目"
 ],
 "Japan": [
  "일본",
  "日本",
  "日本"
 ],
 "KPI (how it is measured)": [
  "KPI (측정 방법)",
  "KPI(測定方法)",
  "KPI(衡量方式)"
 ],
 "Keep consistent with the matrix below": [
  "아래 매트릭스와 일치하도록 작성하세요",
  "下のマトリックスと整合させてください",
  "请与下方矩阵保持一致"
 ],
 "Korea": [
  "한국",
  "韓国",
  "韩国"
 ],
 "Label": [
  "라벨",
  "ラベル",
  "标签"
 ],
 "Label content and unique device identification for every product. Open a product to edit its label.": [
  "전 제품의 라벨 내용과 UDI입니다. 제품을 열어 라벨을 수정하세요.",
  "全製品のラベル内容と UDI です。製品を開いてラベルを編集します。",
  "所有产品的标签内容和 UDI。打开产品即可编辑标签。"
 ],
 "Label content:": [
  "라벨 내용:",
  "ラベル内容:",
  "标签内容:"
 ],
 "Label document": [
  "라벨 문서",
  "ラベル文書",
  "标签文件"
 ],
 "Label information": [
  "라벨 정보",
  "ラベル情報",
  "标签信息"
 ],
 "Label preview": [
  "라벨 미리보기",
  "ラベルのプレビュー",
  "标签预览"
 ],
 "Label preview · About screen": [
  "라벨 미리보기 · 정보 화면",
  "ラベルのプレビュー・情報画面",
  "标签预览 · 关于界面"
 ],
 "Labels & UDI": [
  "라벨 및 UDI",
  "ラベルと UDI",
  "标签与 UDI"
 ],
 "Leaching of toxic substances": [
  "독성 물질 용출",
  "有害物質の溶出",
  "有毒物质浸出"
 ],
 "Leakage of patient data": [
  "환자 데이터 유출",
  "患者データの漏えい",
  "患者数据泄露"
 ],
 "Leave blank if not applicable": [
  "해당 없으면 비워 두세요",
  "該当しない場合は空欄",
  "不适用时请留空"
 ],
 "Leave blank to number automatically (e.g. FDR-09)": [
  "비워 두면 자동으로 번호를 매깁니다(예: FDR-09)",
  "空欄の場合は自動採番します(例:FDR-09)",
  "留空则自动编号(例如 FDR-09)"
 ],
 "Licence / 510(k) / certificate no.": [
  "허가 / 510(k) / 인증서 번호",
  "承認 / 510(k) / 認証書番号",
  "注册证 / 510(k) / 证书编号"
 ],
 "Licence / certification no.": [
  "허가 / 인증 번호",
  "承認 / 認証番号",
  "注册证 / 认证编号"
 ],
 "Licence / clearance": [
  "허가 / 승인",
  "承認 / 認証",
  "注册 / 许可"
 ],
 "Licence no.": [
  "허가번호",
  "承認番号",
  "注册证号"
 ],
 "Life-cycle phases": [
  "수명주기 단계",
  "ライフサイクルの段階",
  "生命周期阶段"
 ],
 "Linked": [
  "연결됨",
  "連携",
  "已关联"
 ],
 "Live": [
  "실시간",
  "リアルタイム",
  "实时"
 ],
 "Live from Qualixx": [
  "Qualixx 데이터로 자동 계산",
  "Qualixx のデータから自動計算",
  "根据 Qualixx 数据自动计算"
 ],
 "Load sample": [
  "샘플 불러오기",
  "サンプルを読み込む",
  "载入示例"
 ],
 "Loss or degradation of function": [
  "기능 상실 또는 저하",
  "機能の喪失・低下",
  "功能丧失或下降"
 ],
 "Main": [
  "메인",
  "メイン",
  "主菜单"
 ],
 "Make obsolete": [
  "폐기",
  "廃止",
  "作废"
 ],
 "Malfunction caused by a software defect": [
  "소프트웨어 결함에 의한 오작동",
  "ソフトウェア不具合による誤動作",
  "软件缺陷导致的故障"
 ],
 "Management": [
  "경영",
  "経営",
  "管理层"
 ],
 "Management review": [
  "경영검토",
  "マネジメントレビュー",
  "管理评审"
 ],
 "Manual": [
  "매뉴얼",
  "マニュアル",
  "手册"
 ],
 "Manuals": [
  "매뉴얼",
  "マニュアル",
  "手册"
 ],
 "Manufacturer": [
  "제조원",
  "製造業者",
  "制造商"
 ],
 "Manufacturer address": [
  "제조원 주소",
  "製造業者の住所",
  "制造商地址"
 ],
 "Manufacturer, MAH, importer…": [
  "제조원, 허가권자, 수입자…",
  "製造業者、製造販売業者、輸入業者…",
  "制造商、注册人、进口商…"
 ],
 "Market": [
  "국가",
  "国・地域",
  "市场"
 ],
 "Market Authorizations": [
  "국가별 허가",
  "国別承認・認証",
  "各国注册"
 ],
 "Market authorizations": [
  "국가별 허가",
  "国別承認・認証",
  "各国注册"
 ],
 "Markets": [
  "판매 국가",
  "販売国",
  "销售市场"
 ],
 "Material with unconfirmed biocompatibility": [
  "생체적합성이 확인되지 않은 재료",
  "生物学的安全性が未確認の材料",
  "生物相容性未确认的材料"
 ],
 "Measurable objectives consistent with the quality policy, reviewed at management review (ISO 13485 §5.4.1, §5.6).": [
  "품질방침에 부합하는 측정 가능한 목표이며, 경영검토에서 검토합니다(ISO 13485 §5.4.1, §5.6).",
  "品質方針と整合した測定可能な目標で、マネジメントレビューで確認します(ISO 13485 §5.4.1、§5.6)。",
  "与质量方针一致的可测量目标,在管理评审中评审(ISO 13485 §5.4.1、§5.6)。"
 ],
 "Measured": [
  "측정 주기",
  "測定頻度",
  "测量频率"
 ],
 "Mechanical energy (moving parts, pinching, falling)": [
  "기계적 에너지(가동부, 끼임, 낙하)",
  "機械エネルギー(可動部、挟み込み、落下)",
  "机械能(运动部件、夹伤、跌落)"
 ],
 "Medical device QMS automation — starting with Risk Management (ISO 14971).": [
  "의료기기 QMS 자동화 — 위험관리(ISO 14971)부터 시작합니다.",
  "医療機器 QMS の自動化 — リスクマネジメント(ISO 14971)から始めます。",
  "医疗器械 QMS 自动化 — 从风险管理(ISO 14971)开始。"
 ],
 "Medical devices your organization manufactures, with their regulatory information and linked risk management files.": [
  "회사가 제조하는 의료기기와 규제 정보, 연결된 위험관리 파일입니다.",
  "自社が製造する医療機器と規制情報、関連するリスクマネジメントファイルです。",
  "贵公司生产的医疗器械及其法规信息和关联的风险管理文档。"
 ],
 "Message": [
  "메시지",
  "メッセージ",
  "消息"
 ],
 "Messages": [
  "메시지",
  "メッセージ",
  "消息"
 ],
 "Microbial contamination / infection": [
  "미생물 오염 / 감염",
  "微生物汚染・感染",
  "微生物污染 / 感染"
 ],
 "Minor": [
  "경미",
  "軽微",
  "轻微"
 ],
 "Missing warnings or cautions": [
  "경고 또는 주의사항 누락",
  "警告・注意事項の欠落",
  "缺少警告或注意事项"
 ],
 "Model": [
  "모델",
  "型式",
  "型号"
 ],
 "Model / version": [
  "모델 / 버전",
  "型式 / バージョン",
  "型号 / 版本"
 ],
 "Monthly": [
  "매월",
  "毎月",
  "每月"
 ],
 "My Dashboard": [
  "내 대시보드",
  "マイダッシュボード",
  "我的仪表板"
 ],
 "My Processes": [
  "내 프로세스",
  "マイプロセス",
  "我的流程"
 ],
 "My Tasks": [
  "내 할 일",
  "マイタスク",
  "我的任务"
 ],
 "My tasks": [
  "내 할 일",
  "マイタスク",
  "我的任务"
 ],
 "Negligible": [
  "무시 가능",
  "無視できる",
  "可忽略"
 ],
 "New File": [
  "새 파일",
  "新規ファイル",
  "新建文档"
 ],
 "New controlled document": [
  "새 관리 문서",
  "新規管理文書",
  "新建受控文件"
 ],
 "New document": [
  "새 문서",
  "新規文書",
  "新建文件"
 ],
 "New record (phase 2)": [
  "새 기록 (2차 개발)",
  "新規記録(フェーズ 2)",
  "新建记录(第二阶段)"
 ],
 "New reviews, approvals and acknowledgements assigned to you will appear here.": [
  "나에게 배정된 검토, 승인, 읽음 확인이 여기에 표시됩니다.",
  "あなたに割り当てられたレビュー、承認、確認依頼がここに表示されます。",
  "分配给您的评审、批准和确认任务将显示在这里。"
 ],
 "New risk file": [
  "새 위험관리 파일",
  "新規リスクファイル",
  "新建风险文档"
 ],
 "New risk management file": [
  "새 위험관리 파일",
  "新規リスクマネジメントファイル",
  "新建风险管理文档"
 ],
 "Next action by": [
  "다음 처리자",
  "次の担当者",
  "下一步处理人"
 ],
 "No data": [
  "데이터 없음",
  "データなし",
  "无数据"
 ],
 "No data yet": [
  "아직 데이터 없음",
  "まだデータがありません",
  "暂无数据"
 ],
 "No forms under this procedure.": [
  "이 절차서에 속한 서식이 없습니다.",
  "この手順書に属する様式はありません。",
  "本程序下没有表单。"
 ],
 "No hazards yet. Start from the hazard library.": [
  "아직 위해요인이 없습니다. 위해요인 라이브러리에서 시작하세요.",
  "ハザードはまだありません。ハザードライブラリから始めましょう。",
  "暂无危险源。请从危险源库开始。"
 ],
 "No market authorizations recorded yet.": [
  "등록된 허가 정보가 없습니다.",
  "承認・認証情報はまだありません。",
  "尚未记录注册信息。"
 ],
 "No matches.": [
  "검색 결과가 없습니다.",
  "該当なし。",
  "无匹配结果。"
 ],
 "No messages yet.": [
  "아직 메시지가 없습니다.",
  "メッセージはまだありません。",
  "暂无消息。"
 ],
 "No objectives yet.": [
  "아직 목표가 없습니다.",
  "目標はまだありません。",
  "暂无目标。"
 ],
 "No open changes. Open any document and choose “Start revision”.": [
  "진행 중인 변경이 없습니다. 문서를 열고 「개정 시작」을 선택하세요.",
  "進行中の変更はありません。文書を開いて「改訂を開始」を選択してください。",
  "没有进行中的变更。打开任意文件并选择\"开始修订\"。"
 ],
 "No products yet.": [
  "아직 제품이 없습니다.",
  "製品はまだありません。",
  "暂无产品。"
 ],
 "No products yet. Add your first product.": [
  "아직 제품이 없습니다. 첫 제품을 추가하세요.",
  "製品はまだありません。最初の製品を追加してください。",
  "暂无产品。请添加第一个产品。"
 ],
 "No risk management file yet.": [
  "아직 위험관리 파일이 없습니다.",
  "リスクマネジメントファイルはまだありません。",
  "暂无风险管理文档。"
 ],
 "Nonconformities, corrective and preventive actions, analysis results, management review input": [
  "부적합, 시정 및 예방조치, 분석 결과, 경영검토 입력",
  "不適合、是正処置・予防処置、分析結果、マネジメントレビューへのインプット",
  "不合格、纠正和预防措施、分析结果、管理评审输入"
 ],
 "None recorded": [
  "기록 없음",
  "記録なし",
  "无记录"
 ],
 "Not acceptable": [
  "수용 불가",
  "受容不可",
  "不可接受"
 ],
 "Not applicable (no unacceptable residual risk)": [
  "해당 없음(수용 불가 잔여위험 없음)",
  "該当なし(受容できない残留リスクなし)",
  "不适用(无不可接受的剩余风险)"
 ],
 "Not assigned": [
  "미할당",
  "未割当",
  "未分配"
 ],
 "Not rated": [
  "미평가",
  "未評価",
  "未评估"
 ],
 "Not required": [
  "불필요",
  "不要",
  "不需要"
 ],
 "Not yet effective": [
  "아직 시행 전",
  "未発効",
  "尚未生效"
 ],
 "Notes": [
  "비고",
  "備考",
  "备注"
 ],
 "Nothing yet.": [
  "아직 없습니다.",
  "まだありません。",
  "暂无。"
 ],
 "Number": [
  "번호",
  "番号",
  "编号"
 ],
 "Objective": [
  "목표",
  "目標",
  "目标"
 ],
 "Objective deleted": [
  "목표를 삭제했습니다",
  "目標を削除しました",
  "目标已删除"
 ],
 "Obsolete": [
  "폐기",
  "廃止",
  "已作废"
 ],
 "Occasional": [
  "가끔",
  "時々",
  "偶尔"
 ],
 "On track": [
  "정상",
  "順調",
  "进展正常"
 ],
 "Open": [
  "열기",
  "開く",
  "打开"
 ],
 "Open Report to print or save the risk management report as PDF.": [
  "보고서 탭에서 위험관리 보고서를 인쇄하거나 PDF로 저장할 수 있습니다.",
  "「報告書」からリスクマネジメント報告書を印刷または PDF で保存できます。",
  "打开\"报告\"可打印风险管理报告或另存为 PDF。"
 ],
 "Open Risk Management": [
  "위험관리 열기",
  "リスクマネジメントを開く",
  "打开风险管理"
 ],
 "Open file": [
  "파일 열기",
  "ファイルを開く",
  "打开文件"
 ],
 "Open label": [
  "라벨 열기",
  "ラベルを開く",
  "打开标签"
 ],
 "Open menu": [
  "메뉴 열기",
  "メニューを開く",
  "打开菜单"
 ],
 "Open workflow": [
  "업무 화면 열기",
  "ワークフローを開く",
  "打开工作流程"
 ],
 "Operation in an unsupported environment (OS / browser)": [
  "지원되지 않는 환경(OS/브라우저)에서의 동작",
  "サポート外の環境(OS/ブラウザ)での動作",
  "在不支持的环境(操作系统/浏览器)中运行"
 ],
 "Optional": [
  "선택 사항",
  "任意",
  "可选"
 ],
 "Optional (required when returning)": [
  "선택 사항(반려 시 필수)",
  "任意(差し戻し時は必須)",
  "可选(退回时必填)"
 ],
 "Other": [
  "기타",
  "その他",
  "其他"
 ],
 "Other Menu": [
  "기타 메뉴",
  "その他のメニュー",
  "其他菜单"
 ],
 "Outputs": [
  "출력",
  "アウトプット",
  "输出"
 ],
 "Overall residual risk": [
  "전체 잔여위험",
  "全体的な残留リスク",
  "综合剩余风险"
 ],
 "Overall residual risk conclusion recorded": [
  "전체 잔여위험 결론 기록",
  "全体的な残留リスクの結論を記録",
  "已记录综合剩余风险结论"
 ],
 "Overdue": [
  "기한 초과",
  "期限超過",
  "已逾期"
 ],
 "Overview": [
  "개요",
  "概要",
  "概述"
 ],
 "Overview & intended use": [
  "개요 및 사용목적",
  "概要と使用目的",
  "概述和预期用途"
 ],
 "Owner": [
  "담당",
  "担当",
  "负责部门"
 ],
 "Owner / team": [
  "책임자 / 팀",
  "責任者 / チーム",
  "负责人 / 团队"
 ],
 "Parent": [
  "상위 문서",
  "上位文書",
  "上级文件"
 ],
 "Parent document": [
  "상위 문서",
  "上位文書",
  "上级文件"
 ],
 "Password": [
  "비밀번호",
  "パスワード",
  "密码"
 ],
 "Pathway": [
  "허가 경로",
  "申請区分",
  "注册途径"
 ],
 "Pending": [
  "대기",
  "未完了",
  "待处理"
 ],
 "People": [
  "구성원",
  "メンバー",
  "人员"
 ],
 "Per audit": [
  "심사마다",
  "審査ごと",
  "每次审核"
 ],
 "Per release": [
  "릴리스마다",
  "リリースごと",
  "每次发布"
 ],
 "Performance degradation from data drift": [
  "데이터 드리프트로 인한 성능 저하",
  "データドリフトによる性能低下",
  "数据漂移导致的性能下降"
 ],
 "Permanent impairment or life-threatening injury": [
  "영구적 장애 또는 생명을 위협하는 부상",
  "永続的な障害または生命を脅かす傷害",
  "永久性损害或危及生命的伤害"
 ],
 "Phase 2": [
  "2차 개발",
  "フェーズ 2",
  "第二阶段"
 ],
 "Phase 2 adds CAPA, training, change control and audit tasks to this same list.": [
  "2차 개발에서 CAPA, 교육, 변경관리, 심사 업무도 이 목록에 추가됩니다.",
  "フェーズ 2 では CAPA、教育訓練、変更管理、監査のタスクもこのリストに追加されます。",
  "第二阶段将在此列表中加入 CAPA、培训、变更控制和审核任务。"
 ],
 "Pick from library": [
  "라이브러리에서 선택",
  "ライブラリから選択",
  "从库中选择"
 ],
 "Pin": [
  "고정",
  "ピン留め",
  "置顶"
 ],
 "Pin to My Processes": [
  "내 프로세스에 고정",
  "マイプロセスにピン留め",
  "置顶到我的流程"
 ],
 "Pinned": [
  "고정됨",
  "ピン留め済み",
  "已置顶"
 ],
 "Plan": [
  "계획",
  "計画",
  "计划"
 ],
 "Planned": [
  "계획",
  "計画中",
  "计划中"
 ],
 "Policy text": [
  "방침 문구",
  "方針の本文",
  "方针内容"
 ],
 "Poor power quality": [
  "전원 품질 불량",
  "電源品質の不良",
  "电源质量差"
 ],
 "Powered by": [
  "Powered by",
  "Powered by",
  "技术支持"
 ],
 "Print / PDF": [
  "인쇄 / PDF",
  "印刷 / PDF",
  "打印 / PDF"
 ],
 "Priority: inherently safe design → protective measure → information for safety": [
  "우선순위: 본질적 안전 설계 → 방호 조치 → 안전 정보",
  "優先順位:本質的安全設計 → 防護手段 → 安全情報",
  "优先顺序:固有安全设计 → 防护措施 → 安全信息"
 ],
 "Probability": [
  "발생가능성",
  "発生確率",
  "概率"
 ],
 "Probable": [
  "높음",
  "起こりうる",
  "很可能"
 ],
 "Procedure": [
  "절차서",
  "手順書",
  "程序文件"
 ],
 "Procedures": [
  "절차서",
  "手順書",
  "程序文件"
 ],
 "Procedures under this manual": [
  "이 매뉴얼의 절차서",
  "このマニュアルの手順書",
  "本手册下的程序文件"
 ],
 "Process": [
  "프로세스",
  "プロセス",
  "流程"
 ],
 "Process Map": [
  "프로세스 맵",
  "プロセスマップ",
  "流程图"
 ],
 "Process at a glance": [
  "프로세스 한눈에 보기",
  "プロセスの概要",
  "流程概览"
 ],
 "Process group": [
  "프로세스 그룹",
  "プロセスグループ",
  "流程组"
 ],
 "Processing delay or no response": [
  "처리 지연 또는 무응답",
  "処理遅延・無応答",
  "处理延迟或无响应"
 ],
 "Product": [
  "제품",
  "製品",
  "产品"
 ],
 "Product Standard": [
  "제품표준서",
  "製品標準書",
  "产品标准"
 ],
 "Product Standards": [
  "제품표준서",
  "製品標準書",
  "产品标准"
 ],
 "Product and process performance, post-market information": [
  "제품·프로세스 성과, 시판 후 정보",
  "製品・プロセスのパフォーマンス、市販後情報",
  "产品和过程绩效、上市后信息"
 ],
 "Product code": [
  "품목 코드",
  "製品コード",
  "产品代码"
 ],
 "Product deleted": [
  "제품을 삭제했습니다",
  "製品を削除しました",
  "产品已删除"
 ],
 "Product information": [
  "제품 정보",
  "製品情報",
  "产品信息"
 ],
 "Product name": [
  "제품명",
  "製品名",
  "产品名称"
 ],
 "Product name and intended use recorded": [
  "제품명과 사용목적 기록",
  "製品名と使用目的を記録",
  "已记录产品名称和预期用途"
 ],
 "Product saved": [
  "제품을 저장했습니다",
  "製品を保存しました",
  "产品已保存"
 ],
 "Product sections": [
  "제품 항목",
  "製品セクション",
  "产品栏目"
 ],
 "Product standard": [
  "제품표준서",
  "製品標準書",
  "产品标准"
 ],
 "Product version": [
  "제품 버전",
  "製品バージョン",
  "产品版本"
 ],
 "Product × market": [
  "제품 × 국가",
  "製品 × 国・地域",
  "产品 × 市场"
 ],
 "Production & post-production": [
  "생산 및 생산 후",
  "製造・製造後",
  "生产和生产后"
 ],
 "Production & post-production information": [
  "생산 및 생산 후 정보",
  "製造・製造後の情報",
  "生产和生产后信息"
 ],
 "Products": [
  "제품",
  "製品",
  "产品"
 ],
 "Protective measure": [
  "방호 조치",
  "防護手段",
  "防护措施"
 ],
 "Quality Documents": [
  "품질문서",
  "品質文書",
  "质量文件"
 ],
 "Quality Manual": [
  "품질매뉴얼",
  "品質マニュアル",
  "质量手册"
 ],
 "Quality Objectives": [
  "품질목표",
  "品質目標",
  "质量目标"
 ],
 "Quality Policy": [
  "품질방침",
  "品質方針",
  "质量方针"
 ],
 "Quality manual": [
  "품질매뉴얼",
  "品質マニュアル",
  "质量手册"
 ],
 "Quality objectives": [
  "품질목표",
  "品質目標",
  "质量目标"
 ],
 "Qualixx software label": [
  "Qualixx 소프트웨어 라벨",
  "Qualixx ソフトウェアラベル",
  "Qualixx 软件标签"
 ],
 "Quarterly": [
  "분기별",
  "四半期ごと",
  "每季度"
 ],
 "Question": [
  "질문",
  "質問",
  "问题"
 ],
 "Radiation (ionizing / non-ionizing overexposure)": [
  "방사선(전리/비전리 과다 노출)",
  "放射線(電離・非電離の過剰被ばく)",
  "辐射(电离/非电离过度暴露)"
 ],
 "Re-enter password": [
  "비밀번호 재입력",
  "パスワードを再入力",
  "再次输入密码"
 ],
 "Re-enter password (top management sign-off)": [
  "비밀번호 재입력(최고경영자 서명)",
  "パスワードを再入力(トップマネジメントの署名)",
  "再次输入密码(最高管理者签署)"
 ],
 "Read & acknowledge": [
  "읽음 확인",
  "既読確認",
  "阅读确认"
 ],
 "Read & acknowledge completion": [
  "읽음 확인 완료율",
  "既読確認の完了率",
  "阅读确认完成率"
 ],
 "Read the instructions for use (eIFU) before use.": [
  "사용 전에 사용설명서(eIFU)를 읽으십시오.",
  "ご使用前に取扱説明書(eIFU)をお読みください。",
  "使用前请阅读使用说明书(eIFU)。"
 ],
 "Reason": [
  "사유",
  "理由",
  "原因"
 ],
 "Reason for change": [
  "변경 사유",
  "変更理由",
  "变更原因"
 ],
 "Reasonably foreseeable misuse": [
  "합리적으로 예측 가능한 오사용",
  "合理的に予見可能な誤使用",
  "合理可预见的误用"
 ],
 "Recently effective": [
  "최근 시행",
  "最近発効",
  "最近生效"
 ],
 "Record hazard → sequence of events → hazardous situation → harm, then estimate severity and probability. Acceptability is judged automatically from the plan matrix.": [
  "위해요인 → 사건의 연쇄 → 위험상황 → 위해 순으로 기록한 뒤 심각도와 발생가능성을 추정하세요. 수용 가능성은 계획의 매트릭스로 자동 판정됩니다.",
  "ハザード → 事象の連鎖 → 危険状態 → 危害の順に記録し、重大度と発生確率を推定します。受容可能性は計画のマトリックスで自動判定されます。",
  "按危险源 → 事件序列 → 危险情况 → 伤害记录,然后估计严重度和概率。可接受性根据计划中的矩阵自动判定。"
 ],
 "Record the intended use and reasonably foreseeable misuse — the starting point for hazard identification.": [
  "위해요인 식별의 출발점인 사용목적과 합리적으로 예측 가능한 오사용을 기록하세요.",
  "ハザード特定の出発点となる使用目的と合理的に予見可能な誤使用を記録します。",
  "记录预期用途和合理可预见的误用 — 这是识别危险源的起点。"
 ],
 "Registration, certification and clearance status of every product by country and region.": [
  "전 제품의 국가·지역별 등록, 인증, 허가 현황입니다.",
  "全製品の国・地域別の登録・認証・承認状況です。",
  "所有产品在各国家和地区的注册、认证和许可状态。"
 ],
 "Regulatory": [
  "인허가",
  "薬事",
  "注册法规"
 ],
 "Regulatory & Quality": [
  "인허가·품질",
  "薬事・品質",
  "法规与质量"
 ],
 "Regulatory status": [
  "규제 상태",
  "規制上の位置づけ",
  "监管状态"
 ],
 "Release date": [
  "출시일",
  "リリース日",
  "发布日期"
 ],
 "Release notes": [
  "릴리스 노트",
  "リリースノート",
  "发布说明"
 ],
 "Released": [
  "출시",
  "発売済み",
  "已上市"
 ],
 "Remote": [
  "드묾",
  "まれ",
  "很少"
 ],
 "Renew": [
  "갱신",
  "更新",
  "续期"
 ],
 "Report": [
  "보고서",
  "報告書",
  "报告"
 ],
 "Require read & acknowledge (training)": [
  "읽음 확인(교육) 필요",
  "既読確認(教育訓練)を必須にする",
  "要求阅读确认(培训)"
 ],
 "Required when returning": [
  "반려 시 필수",
  "差し戻し時は必須",
  "退回时必填"
 ],
 "Residual": [
  "잔여",
  "残留",
  "剩余"
 ],
 "Residual cleaning or disinfection agents": [
  "세척제 또는 소독제 잔류",
  "洗浄剤・消毒剤の残留",
  "清洁剂或消毒剂残留"
 ],
 "Residual risk": [
  "잔여위험",
  "残留リスク",
  "剩余风险"
 ],
 "Residual risk evaluated after control": [
  "통제 후 잔여위험 평가",
  "コントロール後の残留リスクを評価",
  "已评价控制后的剩余风险"
 ],
 "Residual risk evaluation": [
  "잔여위험 평가",
  "残留リスクの評価",
  "剩余风险评价"
 ],
 "Residual risks to disclose in the IFU": [
  "사용설명서에 공개할 잔여위험",
  "取扱説明書で開示する残留リスク",
  "需在使用说明书中披露的剩余风险"
 ],
 "Residual unacc.": [
  "잔여 수용불가",
  "残留受容不可",
  "剩余不可接受"
 ],
 "Resolve the open conditions first.": [
  "미충족 조건을 먼저 해결하세요.",
  "未達の条件を先に解決してください。",
  "请先解决未满足的条件。"
 ],
 "Result linked to the wrong patient": [
  "다른 환자에게 연결된 결과",
  "別の患者に紐付いた結果",
  "结果关联到错误的患者"
 ],
 "Retired": [
  "단종",
  "販売終了",
  "已停产"
 ],
 "Return to author": [
  "작성자에게 반려",
  "作成者に差し戻す",
  "退回编写人"
 ],
 "Returned": [
  "반려됨",
  "差し戻し",
  "已退回"
 ],
 "Returned by approver": [
  "승인자 반려",
  "承認者が差し戻し",
  "批准人退回"
 ],
 "Returned to author": [
  "작성자에게 반려했습니다",
  "作成者に差し戻しました",
  "已退回编写人"
 ],
 "Returned:": [
  "반려 사유:",
  "差し戻し理由:",
  "退回原因:"
 ],
 "Review": [
  "검토",
  "レビュー",
  "评审"
 ],
 "Review & Approval": [
  "검토 및 승인",
  "レビューと承認",
  "评审与批准"
 ],
 "Review comments": [
  "검토 의견",
  "レビューコメント",
  "评审意见"
 ],
 "Review document change": [
  "문서 변경 검토",
  "文書変更のレビュー",
  "评审文件变更"
 ],
 "Review note": [
  "검토 메모",
  "レビューメモ",
  "评审备注"
 ],
 "Review: Accepted": [
  "검토: 승인",
  "レビュー:承認",
  "评审:接受"
 ],
 "Reviewer": [
  "검토자",
  "レビュー担当者",
  "评审人"
 ],
 "Reviewer / approver": [
  "검토자 / 승인자",
  "レビュー担当者 / 承認者",
  "评审人 / 批准人"
 ],
 "Revise policy": [
  "방침 개정",
  "方針を改訂",
  "修订方针"
 ],
 "Revision": [
  "개정",
  "改訂",
  "版本"
 ],
 "Revision (example)": [
  "개정(예시)",
  "改訂(例)",
  "修订(示例)"
 ],
 "Revision history": [
  "개정 이력",
  "改訂履歴",
  "修订历史"
 ],
 "Risk Analysis": [
  "위험 분석",
  "リスク分析",
  "风险分析"
 ],
 "Risk Control": [
  "위험 통제",
  "リスクコントロール",
  "风险控制"
 ],
 "Risk Files": [
  "위험관리 파일",
  "リスクファイル",
  "风险文档"
 ],
 "Risk Management": [
  "위험관리",
  "リスクマネジメント",
  "风险管理"
 ],
 "Risk Management Report": [
  "위험관리 보고서",
  "リスクマネジメント報告書",
  "风险管理报告"
 ],
 "Risk acceptability matrix": [
  "위험 수용 가능성 매트릭스",
  "リスク受容可能性マトリックス",
  "风险可接受性矩阵"
 ],
 "Risk acceptability policy": [
  "위험 수용 가능성 정책",
  "リスク受容可能性の方針",
  "风险可接受性方针"
 ],
 "Risk analysis & evaluation": [
  "위험 분석 및 평가",
  "リスク分析と評価",
  "风险分析与评价"
 ],
 "Risk control": [
  "위험 통제",
  "リスクコントロール",
  "风险控制"
 ],
 "Risk control & verification": [
  "위험 통제 및 검증",
  "リスクコントロールと検証",
  "风险控制与验证"
 ],
 "Risk estimated for every hazardous situation": [
  "모든 위험상황에 대해 위험 추정",
  "すべての危険状態でリスクを推定",
  "已对所有危险情况进行风险估计"
 ],
 "Risk files": [
  "위험관리 파일",
  "リスクファイル",
  "风险文档"
 ],
 "Risk management file created": [
  "위험관리 파일을 만들었습니다",
  "リスクマネジメントファイルを作成しました",
  "风险管理文档已创建"
 ],
 "Risk management file:": [
  "위험관리 파일:",
  "リスクマネジメントファイル:",
  "风险管理文档:"
 ],
 "Risk management files": [
  "위험관리 파일",
  "リスクマネジメントファイル",
  "风险管理文档"
 ],
 "Risk management owner": [
  "위험관리 책임자",
  "リスクマネジメント責任者",
  "风险管理负责人"
 ],
 "Risk management plan": [
  "위험관리 계획",
  "リスクマネジメント計画",
  "风险管理计划"
 ],
 "Risk management plan recorded (owner, acceptability policy)": [
  "위험관리 계획 기록(책임자, 수용 가능성 정책)",
  "リスクマネジメント計画を記録(責任者、受容可能性の方針)",
  "已记录风险管理计划(负责人、可接受性方针)"
 ],
 "Risk management report": [
  "위험관리 보고서",
  "リスクマネジメント報告書",
  "风险管理报告"
 ],
 "Risk management review": [
  "위험관리 검토",
  "リスクマネジメントレビュー",
  "风险管理评审"
 ],
 "Risk management steps": [
  "위험관리 단계",
  "リスクマネジメントの手順",
  "风险管理步骤"
 ],
 "Risk table CSV": [
  "위험 표 CSV",
  "リスク表 CSV",
  "风险表 CSV"
 ],
 "Risks arising from control measures reviewed": [
  "통제 조치로 인한 위험 검토 완료",
  "コントロール手段から生じるリスクをレビュー",
  "已评审控制措施引入的风险"
 ],
 "Risks from control measures reviewed": [
  "통제 조치로 인한 위험 검토 완료",
  "コントロール手段によるリスクをレビュー",
  "已评审控制措施引入的风险"
 ],
 "SW safety class": [
  "SW 안전등급",
  "SW 安全クラス",
  "软件安全级别"
 ],
 "SW safety class (IEC 62304)": [
  "SW 안전등급 (IEC 62304)",
  "SW 安全クラス(IEC 62304)",
  "软件安全级别(IEC 62304)"
 ],
 "Safety Characteristics": [
  "안전 특성",
  "安全特性",
  "安全特征"
 ],
 "Sample risk management file loaded": [
  "샘플 위험관리 파일을 불러왔습니다",
  "サンプルのリスクマネジメントファイルを読み込みました",
  "已载入示例风险管理文档"
 ],
 "Save": [
  "저장",
  "保存",
  "保存"
 ],
 "Save draft": [
  "초안 저장",
  "草案を保存",
  "保存草稿"
 ],
 "Save plan": [
  "계획 저장",
  "計画を保存",
  "保存计划"
 ],
 "Saved": [
  "저장했습니다",
  "保存しました",
  "已保存"
 ],
 "Scope": [
  "적용 범위",
  "適用範囲",
  "范围"
 ],
 "Search": [
  "검색",
  "検索",
  "搜索"
 ],
 "Search (Ctrl+K)": [
  "검색 (Ctrl+K)",
  "検索 (Ctrl+K)",
  "搜索 (Ctrl+K)"
 ],
 "Search ID or title": [
  "문서번호 또는 제목 검색",
  "文書番号・タイトルで検索",
  "搜索编号或标题"
 ],
 "Search documents": [
  "문서 검색",
  "文書を検索",
  "搜索文件"
 ],
 "Search processes, documents, forms, products, people…": [
  "프로세스, 문서, 서식, 제품, 구성원 검색…",
  "プロセス、文書、様式、製品、メンバーを検索…",
  "搜索流程、文件、表单、产品、人员…"
 ],
 "Section 1 (general information) comes from the product information. Saving an approved standard starts a new draft revision.": [
  "1항(일반 정보)은 제품 정보에서 가져옵니다. 승인된 표준서를 저장하면 새 개정 초안이 시작됩니다.",
  "第1項(一般情報)は製品情報から取得します。承認済みの標準書を保存すると新しい改訂草案になります。",
  "第1节(基本信息)来自产品信息。保存已批准的标准将开始新的修订草稿。"
 ],
 "Section 1 is taken from the product information and label, so it is always in step with them.": [
  "1항은 제품 정보와 라벨에서 가져오므로 항상 내용이 일치합니다.",
  "第1項は製品情報とラベルから取得するため、常に内容が一致します。",
  "第1节取自产品信息和标签,因此始终保持一致。"
 ],
 "Select": [
  "선택",
  "選択",
  "选择"
 ],
 "Select a person to start a conversation.": [
  "대화할 사람을 선택하세요.",
  "会話する相手を選択してください。",
  "请选择联系人开始对话。"
 ],
 "Sequence of events": [
  "사건의 연쇄",
  "事象の連鎖",
  "事件序列"
 ],
 "Serious": [
  "심각",
  "深刻",
  "严重"
 ],
 "Settings": [
  "설정",
  "設定",
  "设置"
 ],
 "Severity": [
  "심각도",
  "重大度",
  "严重度"
 ],
 "Sign": [
  "서명",
  "署名",
  "签名"
 ],
 "Sign & approve": [
  "서명 및 승인",
  "署名して承認",
  "签名并批准"
 ],
 "Sign & make obsolete": [
  "서명 및 폐기",
  "署名して廃止",
  "签名并作废"
 ],
 "Sign in": [
  "로그인",
  "サインイン",
  "登录"
 ],
 "Sign in to your workspace": [
  "업무 공간에 로그인",
  "ワークスペースにサインイン",
  "登录您的工作区"
 ],
 "Sign out": [
  "로그아웃",
  "サインアウト",
  "退出登录"
 ],
 "Significant residual risks to disclose": [
  "공개해야 할 중대한 잔여위험",
  "開示すべき重要な残留リスク",
  "需披露的重大剩余风险"
 ],
 "Software": [
  "소프트웨어",
  "ソフトウェア",
  "软件"
 ],
 "Software version": [
  "소프트웨어 버전",
  "ソフトウェアバージョン",
  "软件版本"
 ],
 "Software version shown": [
  "표시되는 소프트웨어 버전",
  "表示されるソフトウェアバージョン",
  "显示的软件版本"
 ],
 "Soon": [
  "예정",
  "予定",
  "即将推出"
 ],
 "Specification": [
  "기준",
  "規格",
  "规格"
 ],
 "Stage": [
  "단계",
  "段階",
  "阶段"
 ],
 "Standard": [
  "표준",
  "規格",
  "标准"
 ],
 "Standards": [
  "표준",
  "規格",
  "标准"
 ],
 "Star a process to pin it here.": [
  "프로세스에 별표를 하면 여기에 고정됩니다.",
  "プロセスにスターを付けるとここに表示されます。",
  "为流程加星标即可置顶到此处。"
 ],
 "Start a risk management file": [
  "위험관리 파일 시작",
  "リスクマネジメントファイルを開始",
  "开始风险管理文档"
 ],
 "Start draft": [
  "초안 시작",
  "草案を開始",
  "开始草稿"
 ],
 "Start revision": [
  "개정 시작",
  "改訂を開始",
  "开始修订"
 ],
 "Status": [
  "상태",
  "ステータス",
  "状态"
 ],
 "Steps follow ISO 14971:2019 clauses 4–9. Question and hazard lists are short summaries written for this demo, not the standard text.": [
  "단계는 ISO 14971:2019 4–9항을 따릅니다. 질문과 위해요인 목록은 이 데모를 위해 작성한 요약이며 표준 원문이 아닙니다.",
  "手順は ISO 14971:2019 の箇条 4〜9 に従います。質問とハザードの一覧はこのデモ用の要約で、規格の原文ではありません。",
  "步骤遵循 ISO 14971:2019 第 4–9 章。问题和危险源列表是为本演示编写的简要概括,并非标准原文。"
 ],
 "Submit for review": [
  "검토 요청",
  "レビューを依頼",
  "提交评审"
 ],
 "Submit review": [
  "검토 제출",
  "レビューを提出",
  "提交评审意见"
 ],
 "Submitted": [
  "제출",
  "申請済み",
  "已提交"
 ],
 "Submitted for review": [
  "검토를 요청했습니다",
  "レビューを依頼しました",
  "已提交评审"
 ],
 "Superseded": [
  "대체됨",
  "旧版",
  "已替代"
 ],
 "Support": [
  "지원",
  "支援",
  "支持"
 ],
 "Supported standards": [
  "지원 표준",
  "対応規格",
  "支持的标准"
 ],
 "Suspended": [
  "정지",
  "停止",
  "已暂停"
 ],
 "System": [
  "시스템",
  "システム",
  "系统"
 ],
 "Target": [
  "목표치",
  "目標値",
  "目标值"
 ],
 "Task": [
  "할 일",
  "タスク",
  "任务"
 ],
 "Team": [
  "팀",
  "チーム",
  "团队"
 ],
 "Temperature or humidity out of range": [
  "온도 또는 습도 범위 이탈",
  "温度・湿度の範囲外",
  "温度或湿度超出范围"
 ],
 "Temporary injury not requiring medical intervention": [
  "의료적 처치가 필요 없는 일시적 부상",
  "医療的介入を要しない一時的な傷害",
  "无需医疗干预的暂时性伤害"
 ],
 "Test method / standard": [
  "시험방법 / 규격",
  "試験方法 / 規格",
  "试验方法 / 标准"
 ],
 "The document is withdrawn from use and kept as an obsolete record (§4.2.4 g). It can no longer be revised.": [
  "문서는 사용이 중지되고 폐기 기록으로 보관됩니다(§4.2.4 g). 더 이상 개정할 수 없습니다.",
  "文書は使用を中止し、廃止記録として保管されます(§4.2.4 g)。以後は改訂できません。",
  "该文件将停止使用并作为作废记录保存(§4.2.4 g),之后不能再修订。"
 ],
 "The guided workflow for this process is planned for phase 2. Until then, use the procedure and forms below; records are kept with the forms.": [
  "이 프로세스의 업무 화면은 2차 개발 예정입니다. 그전까지는 아래 절차서와 서식을 사용하고, 기록은 서식으로 관리합니다.",
  "このプロセスのワークフローはフェーズ 2 で提供予定です。それまでは下の手順書と様式を使用し、記録は様式で管理します。",
  "本流程的引导式工作流程计划在第二阶段推出。在此之前,请使用下方的程序文件和表单,记录随表单保存。"
 ],
 "Thermal energy (hot surfaces, burns)": [
  "열 에너지(뜨거운 표면, 화상)",
  "熱エネルギー(高温表面、熱傷)",
  "热能(高温表面、烧伤)"
 ],
 "This is a front-end demo. Everything is stored only in this browser's local storage. Clearing browser data removes it. Do not enter confidential information.": [
  "프런트엔드 데모입니다. 모든 데이터는 이 브라우저의 로컬 저장소에만 저장되며, 브라우저 데이터를 지우면 삭제됩니다. 기밀 정보는 입력하지 마세요.",
  "フロントエンドのデモです。データはすべてこのブラウザのローカルストレージにのみ保存され、ブラウザのデータを消去すると削除されます。機密情報は入力しないでください。",
  "这是前端演示。所有数据仅保存在本浏览器的本地存储中,清除浏览器数据后将被删除。请勿输入机密信息。"
 ],
 "Time": [
  "시간",
  "日時",
  "时间"
 ],
 "Title": [
  "제목",
  "タイトル",
  "标题"
 ],
 "Title (English)": [
  "제목(영문)",
  "タイトル(英語)",
  "标题(英文)"
 ],
 "Title (Korean)": [
  "제목(한글)",
  "タイトル(韓国語)",
  "标题(韩文)"
 ],
 "To be completed": [
  "작성 예정",
  "未記入",
  "待填写"
 ],
 "Training": [
  "교육",
  "教育訓練",
  "培训"
 ],
 "Type": [
  "유형",
  "種類",
  "类型"
 ],
 "Type my own": [
  "직접 입력",
  "直接入力",
  "自行输入"
 ],
 "Unacceptable": [
  "수용 불가",
  "受容不可",
  "不可接受"
 ],
 "Unacceptable risk — a control measure is required.": [
  "수용 불가 위험 — 통제 조치가 필요합니다.",
  "受容できないリスク — コントロール手段が必要です。",
  "不可接受的风险 — 需要控制措施。"
 ],
 "Unauthorized access": [
  "무단 접근",
  "不正アクセス",
  "未授权访问"
 ],
 "Unit": [
  "단위",
  "単位",
  "单位"
 ],
 "United Kingdom": [
  "영국",
  "英国",
  "英国"
 ],
 "United States": [
  "미국",
  "米国",
  "美国"
 ],
 "Update": [
  "갱신",
  "更新",
  "更新"
 ],
 "Updated": [
  "수정일",
  "更新日",
  "更新时间"
 ],
 "Use (operational)": [
  "사용(운용)",
  "使用(運用)",
  "使用(操作)"
 ],
 "Use environment": [
  "사용 환경",
  "使用環境",
  "使用环境"
 ],
 "Use error (wrong setting or operation)": [
  "사용 오류(잘못된 설정 또는 조작)",
  "使用エラー(誤った設定・操作)",
  "使用错误(设置或操作错误)"
 ],
 "Use outside the intended use": [
  "사용목적 외 사용",
  "使用目的外の使用",
  "超出预期用途的使用"
 ],
 "User": [
  "사용자",
  "ユーザー",
  "用户"
 ],
 "Users / environment": [
  "사용자 / 환경",
  "使用者 / 環境",
  "用户 / 环境"
 ],
 "Users must read & acknowledge the new revision": [
  "사용자가 새 개정본을 읽고 확인해야 합니다",
  "利用者に新しい改訂の既読確認を求める",
  "用户必须阅读并确认新版本"
 ],
 "Validation": [
  "밸리데이션",
  "バリデーション",
  "确认"
 ],
 "Verdict": [
  "판정",
  "判定",
  "判定"
 ],
 "Verification": [
  "검증",
  "検証",
  "验证"
 ],
 "Verification activities": [
  "검증 활동",
  "検証活動",
  "验证活动"
 ],
 "Version": [
  "버전",
  "バージョン",
  "版本"
 ],
 "View all": [
  "전체 보기",
  "すべて表示",
  "查看全部"
 ],
 "Warnings and precautions": [
  "경고 및 주의사항",
  "警告・使用上の注意",
  "警告和注意事项"
 ],
 "Website": [
  "웹사이트",
  "ウェブサイト",
  "网站"
 ],
 "What changed": [
  "변경 내용",
  "変更内容",
  "变更内容"
 ],
 "What changes?": [
  "무엇을 변경합니까?",
  "何を変更しますか?",
  "变更内容是什么?"
 ],
 "What is the expected lifetime or shelf life?": [
  "예상 수명 또는 유효기간은 얼마입니까?",
  "想定される耐用期間・使用期限は?",
  "预期使用寿命或有效期是多久?"
 ],
 "What is the intended use and how is the device used?": [
  "사용목적은 무엇이며 기기를 어떻게 사용합니까?",
  "使用目的は何で、機器はどのように使用されますか?",
  "预期用途是什么,器械如何使用?"
 ],
 "Which factors in the use environment (hospital, home) affect it?": [
  "사용 환경(병원, 가정)의 어떤 요인이 영향을 줍니까?",
  "使用環境(病院、在宅)のどの要因が影響しますか?",
  "使用环境(医院、家庭)中哪些因素会对其产生影响?"
 ],
 "Withdraw change": [
  "변경 철회",
  "変更を取り下げ",
  "撤回变更"
 ],
 "Withdrawn": [
  "철회",
  "取り下げ",
  "已撤回"
 ],
 "Work Process": [
  "업무 프로세스",
  "業務プロセス",
  "工作流程"
 ],
 "Workflow": [
  "업무 흐름",
  "ワークフロー",
  "工作流程"
 ],
 "Workflow live": [
  "업무 화면 운영 중",
  "ワークフロー稼働中",
  "工作流程已上线"
 ],
 "Write a message…": [
  "메시지 입력…",
  "メッセージを入力…",
  "输入消息…"
 ],
 "You": [
  "나",
  "自分",
  "我"
 ],
 "You acknowledged": [
  "확인 완료",
  "確認済み",
  "您已确认"
 ],
 "You're all caught up.": [
  "처리할 일이 없습니다.",
  "対応が必要なタスクはありません。",
  "没有待处理的任务。"
 ],
 "Your review": [
  "내 검토",
  "あなたのレビュー",
  "您的评审"
 ],
 "acknowledgements pending": [
  "읽음 확인 대기",
  "既読確認待ち",
  "待阅读确认"
 ],
 "added ·": [
  "추가 ·",
  "追加 ·",
  "新增 ·"
 ],
 "approved": [
  "승인",
  "承認",
  "已批准"
 ],
 "at risk": [
  "위험",
  "要注意",
  "存在风险"
 ],
 "awaiting approval": [
  "승인 대기",
  "承認待ち",
  "待批准"
 ],
 "calculated automatically": [
  "자동 계산",
  "自動計算",
  "自动计算"
 ],
 "changes in progress": [
  "진행 중인 변경",
  "進行中の変更",
  "进行中的变更"
 ],
 "controlled documents": [
  "관리 문서",
  "管理文書",
  "受控文件"
 ],
 "e.g. 1.0.3 (build 240)": [
  "예: 1.0.3 (build 240)",
  "例:1.0.3 (build 240)",
  "例如 1.0.3 (build 240)"
 ],
 "e.g. Add cybersecurity commitment": [
  "예: 사이버보안 관련 약속 추가",
  "例:サイバーセキュリティへの取り組みを追加",
  "例如:增加网络安全承诺"
 ],
 "e.g. Add design transfer checklist step": [
  "예: 설계 이전 체크리스트 단계 추가",
  "例:設計移管チェックリストの手順を追加",
  "例如:增加设计转换检查单步骤"
 ],
 "e.g. CAPA-2026-012, audit finding, regulation update": [
  "예: CAPA-2026-012, 심사 지적사항, 규제 변경",
  "例:CAPA-2026-012、監査指摘、規制改正",
  "例如:CAPA-2026-012、审核发现、法规更新"
 ],
 "e.g. Class II": [
  "예: 2등급",
  "例:クラス II",
  "例如:II 类"
 ],
 "e.g. KR digital device code": [
  "예: 국내 품목 코드",
  "例:韓国の品目コード",
  "例如:韩国产品代码"
 ],
 "e.g. KR, US (planned)": [
  "예: KR, US (예정)",
  "例:KR、US(予定)",
  "例如:KR、US(计划中)"
 ],
 "e.g. LBL-001 Rev.00": [
  "예: LBL-001 Rev.00",
  "例:LBL-001 Rev.00",
  "例如:LBL-001 Rev.00"
 ],
 "e.g. No new risk introduced by the warning": [
  "예: 경고 문구로 인한 새로운 위험 없음",
  "例:警告による新たなリスクなし",
  "例如:警告未引入新的风险"
 ],
 "forms": [
  "서식",
  "様式",
  "表单"
 ],
 "initially unacceptable": [
  "초기 수용 불가",
  "初期受容不可",
  "初始不可接受"
 ],
 "markets with approval": [
  "허가 국가",
  "承認取得国",
  "已获批市场"
 ],
 "next due": [
  "다음 기한",
  "次の期限",
  "下一截止日期"
 ],
 "none": [
  "없음",
  "なし",
  "无"
 ],
 "none yet": [
  "아직 없음",
  "まだなし",
  "暂无"
 ],
 "objectives": [
  "목표",
  "目標",
  "目标"
 ],
 "on track": [
  "정상",
  "順調",
  "进展正常"
 ],
 "open records": [
  "진행 중 기록",
  "未完了の記録",
  "未关闭记录"
 ],
 "removed lines": [
  "삭제된 줄",
  "削除行",
  "删除行"
 ],
 "renew": [
  "갱신",
  "更新",
  "续期"
 ],
 "renewals due in 90 days": [
  "90일 내 갱신",
  "90日以内に更新",
  "90 天内到期续期"
 ],
 "submitted / in preparation": [
  "제출 / 준비 중",
  "申請済み / 準備中",
  "已提交 / 准备中"
 ],
 "unacceptable residual risks": [
  "수용 불가 잔여위험",
  "受容できない残留リスク",
  "不可接受的剩余风险"
 ],
 "§7.4 · required for unacceptable residual risk": [
  "§7.4 · 수용 불가 잔여위험에 필수",
  "§7.4・受容できない残留リスクに必須",
  "§7.4 · 不可接受的剩余风险必填"
 ],
 "Language": [
  "언어",
  "言語",
  "语言"
 ],
 "Display language": [
  "표시 언어",
  "表示言語",
  "显示语言"
 ],
 "Choose the language for menus, buttons and messages. Content you enter — documents, products and records — stays in the language it was written in.": [
  "메뉴, 버튼, 안내 문구의 언어를 선택합니다. 직접 입력한 내용(문서, 제품, 기록)은 작성한 언어 그대로 표시됩니다.",
  "メニュー、ボタン、メッセージの言語を選択します。入力した内容(文書、製品、記録)は作成した言語のまま表示されます。",
  "选择菜单、按钮和提示信息的语言。您输入的内容(文件、产品和记录)将保持原有语言。"
 ],
 "Dates follow the selected language.": [
  "날짜 형식도 선택한 언어에 맞춰 바뀝니다.",
  "日付の表示形式も選択した言語に合わせて変わります。",
  "日期格式也会随所选语言变化。"
 ],
 "Demo: the choice is saved in this browser. In the live service it is saved to your account and your organization can set a default.": [
  "데모에서는 이 브라우저에 저장됩니다. 실제 서비스에서는 계정별로 저장되며, 회사 기본 언어를 지정할 수 있습니다.",
  "デモではこのブラウザに保存されます。本番サービスではアカウントごとに保存され、組織の既定言語も設定できます。",
  "演示中此设置保存在本浏览器。正式服务中将按账户保存,并可设置组织默认语言。"
 ],
 "Account": [
  "계정",
  "アカウント",
  "账户"
 ],
 "Name": [
  "이름",
  "氏名",
  "姓名"
 ],
 "Role": [
  "역할",
  "ロール",
  "角色"
 ],
 "Organization": [
  "조직",
  "組織",
  "组织"
 ],
 "Language changed": [
  "언어를 변경했습니다",
  "言語を変更しました",
  "语言已更改"
 ],
 "Preferences for your account.": [
  "내 계정의 환경설정입니다.",
  "アカウントの設定です。",
  "您的账户偏好设置。"
 ],
 "More languages can be added later.": [
  "다른 언어는 이후에 추가할 수 있습니다.",
  "他の言語は今後追加できます。",
  "以后可以添加更多语言。"
 ],
 "Content": [
  "내용",
  "内容",
  "内容"
 ],
 "Risk Management live": [
  "위험관리 운영 중",
  "リスクマネジメント稼働中",
  "风险管理已上线"
 ],
 "Everything assigned to you across processes": [
  "모든 프로세스에서 나에게 배정된 일입니다",
  "すべてのプロセスであなたに割り当てられたタスクです",
  "各流程中分配给您的所有任务"
 ],
 "You started this change": [
  "내가 시작한 변경",
  "自分が開始した変更",
  "您发起的变更"
 ],
 "Returned by reviewer": [
  "검토자 반려",
  "レビュー担当者が差し戻し",
  "评审人退回"
 ],
 "Complete draft and submit": [
  "초안 작성 후 제출",
  "草案を完成して提出",
  "完成草稿并提交"
 ],
 "Revise returned draft": [
  "반려된 초안 수정",
  "差し戻された草案を修正",
  "修改退回的草稿"
 ],
 "Approve risk management review": [
  "위험관리 검토 승인",
  "リスクマネジメントレビューを承認",
  "批准风险管理评审"
 ],
 "Read & acknowledge required when effective": [
  "시행 시 읽음 확인 필요",
  "発効時に既読確認が必要",
  "生效时需阅读确认"
 ],
 "Becomes effective on": [
  "시행 예정일",
  "発効予定日",
  "生效日期"
 ],
 "Kept for reference only — do not use.": [
  "참고용으로만 보관 — 사용 금지.",
  "参照用としてのみ保管 — 使用しないでください。",
  "仅供参考保存 — 请勿使用。"
 ],
 "Change in progress": [
  "진행 중인 변경",
  "進行中の変更",
  "进行中的变更"
 ],
 "Edit product standard": [
  "제품표준서 편집",
  "製品標準書を編集",
  "编辑产品标准"
 ],
 "Approve product standard": [
  "제품표준서 승인",
  "製品標準書を承認",
  "批准产品标准"
 ],
 "Revise quality policy": [
  "품질방침 개정",
  "品質方針を改訂",
  "修订质量方针"
 ],
 "Update objective": [
  "목표 갱신",
  "目標を更新",
  "更新目标"
 ],
 "Edit authorization": [
  "허가 정보 편집",
  "承認・認証を編集",
  "编辑注册信息"
 ],
 "Management processes": [
  "경영 프로세스",
  "マネジメントプロセス",
  "管理过程"
 ],
 "Core processes": [
  "핵심 프로세스",
  "コアプロセス",
  "核心过程"
 ],
 "Support processes": [
  "지원 프로세스",
  "支援プロセス",
  "支持过程"
 ],
 "Measurement & improvement": [
  "측정 및 개선",
  "測定と改善",
  "测量与改进"
 ],
 "Severity \\ Probability": [
  "심각도 \\ 발생가능성",
  "重大度 \\ 発生確率",
  "严重度 \\ 概率"
 ],
 "approval of the risk management review": [
  "위험관리 검토 승인",
  "リスクマネジメントレビューの承認",
  "批准风险管理评审"
 ],
 "data is stored only in this browser.": [
  "데이터는 이 브라우저에만 저장됩니다.",
  "データはこのブラウザにのみ保存されます。",
  "数据仅保存在本浏览器中。"
 ],
 "Product standard (제품표준서 / device master record) for every product.": [
  "전 제품의 제품표준서입니다.",
  "全製品の製品標準書(デバイスマスターレコード)です。",
  "所有产品的产品标准(器械主记录)。"
 ],
 "Product standard (제품표준서) — the device master record required by KGMP and ISO 13485 §4.2.3.": [
  "제품표준서 — KGMP와 ISO 13485 §4.2.3에서 요구하는 제품 기준 문서입니다.",
  "製品標準書 — KGMP と ISO 13485 §4.2.3 が求めるデバイスマスターレコードです。",
  "产品标准 — KGMP 和 ISO 13485 §4.2.3 要求的器械主记录。"
 ],
 "General information": [
  "일반 정보",
  "一般情報",
  "基本信息"
 ],
 "Description and structure": [
  "모양 및 구조",
  "形状及び構造",
  "外形与结构"
 ],
 "Components and configuration": [
  "구성 (부품·SW 모듈·SOUP)",
  "構成(部品・SW モジュール・SOUP)",
  "组成(部件·软件模块·SOUP)"
 ],
 "Raw materials": [
  "원자재",
  "原材料",
  "原材料"
 ],
 "Performance and safety specifications": [
  "성능 및 안전 기준",
  "性能及び安全性に関する規格",
  "性能和安全要求"
 ],
 "Operating environment": [
  "사용·운영 환경",
  "使用・運用環境",
  "使用/运行环境"
 ],
 "Manufacturing method": [
  "제조 방법",
  "製造方法",
  "生产方法"
 ],
 "Inspection and test method": [
  "시험 검사 방법",
  "試験検査方法",
  "检验方法"
 ],
 "Storage and shelf life": [
  "저장 방법 및 사용 기간",
  "保管方法及び有効期間",
  "贮存条件和有效期"
 ],
 "Packaging and labelling": [
  "포장 및 표시기재",
  "包装及び表示",
  "包装与标签"
 ],
 "Installation and servicing": [
  "설치 및 서비스",
  "設置及びサービス",
  "安装与服务"
 ],
 "Related records": [
  "관련 문서",
  "関連記録",
  "相关记录"
 ],
 "Product Development": [
  "제품개발",
  "製品開発",
  "产品开发"
 ],
 "Medical Device Technology": [
  "의료기기기술",
  "医療機器技術",
  "医疗器械技术"
 ],
 "control measures": [
  "통제 조치",
  "コントロール手段",
  "控制措施"
 ],
 "fully verified": [
  "검증 완료",
  "検証完了",
  "已完全验证"
 ],
 "All Processes": [
  "전체 프로세스",
  "すべてのプロセス",
  "全部流程"
 ],
 "Change Control": [
  "변경관리",
  "変更管理",
  "变更控制"
 ],
 "Changes": [
  "변경",
  "変更",
  "变更"
 ],
 "Choose a quality process to work in.": [
  "작업할 품질 프로세스를 선택하세요.",
  "作業する品質プロセスを選択してください。",
  "请选择要处理的质量流程。"
 ],
 "Complaints & PMS": [
  "불만 및 시판 후 감시",
  "苦情と市販後監視",
  "投诉与上市后监督"
 ],
 "Customer requirements, regulatory requirements, risk management outputs": [
  "고객 요구사항, 규제 요구사항, 위험관리 결과",
  "顧客要求事項、規制要求事項、リスクマネジメントのアウトプット",
  "顾客要求、法规要求、风险管理输出"
 ],
 "Delete this control measure?": [
  "이 통제 조치를 삭제할까요?",
  "このコントロール手段を削除しますか?",
  "删除此控制措施?"
 ],
 "Design and development file, released product, installation and service records": [
  "설계 및 개발 파일, 출시 제품, 설치 및 서비스 기록",
  "設計開発ファイル、出荷製品、据付・サービス記録",
  "设计开发文档、放行产品、安装和服务记录"
 ],
 "Documents and records, qualified people, infrastructure, purchased product, identification data, risk management file": [
  "문서와 기록, 자격을 갖춘 인원, 기반시설, 구매품, 식별 데이터, 위험관리 파일",
  "文書と記録、力量のある要員、インフラストラクチャ、購買製品、識別データ、リスクマネジメントファイル",
  "文件和记录、合格人员、基础设施、采购产品、标识数据、风险管理文档"
 ],
 "Edit control measure": [
  "통제 조치 편집",
  "コントロール手段を編集",
  "编辑控制措施"
 ],
 "Feed complaints and post-market data back into risk management.": [
  "불만과 시판 후 데이터를 위험관리에 반영합니다.",
  "苦情と市販後データをリスクマネジメントにフィードバックします。",
  "将投诉和上市后数据反馈到风险管理中。"
 ],
 "Feedback, complaints, regulatory reports, audit results, data analysis, regulatory changes": [
  "피드백, 불만, 규제기관 보고, 심사 결과, 데이터 분석, 규제 변경",
  "フィードバック、苦情、規制当局への報告、監査結果、データ分析、規制の変更",
  "反馈、投诉、监管报告、审核结果、数据分析、法规变化"
 ],
 "Hazard analysis, risk control, residual risk evaluation and automatic report generation.": [
  "위해요인 분석, 위험 통제, 잔여위험 평가, 보고서 자동 생성.",
  "ハザード分析、リスクコントロール、残留リスク評価、報告書の自動作成。",
  "危险源分析、风险控制、剩余风险评价和报告自动生成。"
 ],
 "In progress": [
  "진행 중",
  "進行中",
  "进行中"
 ],
 "Label tab": [
  "라벨 탭",
  "ラベルタブ",
  "标签页"
 ],
 "Needs of each process": [
  "각 프로세스의 필요 사항",
  "各プロセスのニーズ",
  "各流程的需求"
 ],
 "No documents are being changed.": [
  "개정 중인 문서가 없습니다.",
  "改訂中の文書はありません。",
  "没有正在变更的文件。"
 ],
 "No files match this view.": [
  "조건에 맞는 파일이 없습니다.",
  "条件に一致するファイルはありません。",
  "没有符合条件的文档。"
 ],
 "No obsolete documents.": [
  "폐기된 문서가 없습니다.",
  "廃止文書はありません。",
  "没有作废文件。"
 ],
 "No risk management files yet. Create one or load the sample.": [
  "아직 위험관리 파일이 없습니다. 새로 만들거나 샘플을 불러오세요.",
  "リスクマネジメントファイルはまだありません。作成するかサンプルを読み込んでください。",
  "暂无风险管理文档。请新建或载入示例。"
 ],
 "Nonconformity & CAPA": [
  "부적합 및 CAPA",
  "不適合と CAPA",
  "不合格与 CAPA"
 ],
 "Nonconformity handling, corrective and preventive action, linked to risk re-evaluation.": [
  "부적합 처리와 시정·예방조치를 위험 재평가와 연결합니다.",
  "不適合の処理、是正処置・予防処置をリスクの再評価と連携します。",
  "不合格处理、纠正和预防措施,并与风险再评价关联。"
 ],
 "Overall residual risk saved": [
  "전체 잔여위험을 저장했습니다",
  "全体的な残留リスクを保存しました",
  "综合剩余风险已保存"
 ],
 "Overview & intended use saved": [
  "개요 및 사용목적을 저장했습니다",
  "概要と使用目的を保存しました",
  "概述和预期用途已保存"
 ],
 "Pinned to My Processes": [
  "내 프로세스에 고정했습니다",
  "マイプロセスにピン留めしました",
  "已置顶到我的流程"
 ],
 "Quality policy and objectives, improvement decisions, resources, change approvals": [
  "품질방침과 목표, 개선 결정, 자원, 변경 승인",
  "品質方針と目標、改善の決定、資源、変更の承認",
  "质量方针和目标、改进决定、资源、变更批准"
 ],
 "Removed from My Processes": [
  "내 프로세스에서 제거했습니다",
  "マイプロセスから外しました",
  "已从我的流程中移除"
 ],
 "Review, approval and revision history — built into Risk Management first.": [
  "검토, 승인, 개정 이력 — 먼저 위험관리에 적용했습니다.",
  "レビュー、承認、改訂履歴 — まずリスクマネジメントに組み込みました。",
  "评审、批准和修订历史 — 首先内置于风险管理中。"
 ],
 "Revision started (approval withdrawn)": [
  "개정을 시작했습니다(승인 취소)",
  "改訂を開始しました(承認を取り消し)",
  "已开始修订(撤销批准)"
 ],
 "Risk file": [
  "위험관리 파일",
  "リスクファイル",
  "风险文档"
 ],
 "Risk management plan saved": [
  "위험관리 계획을 저장했습니다",
  "リスクマネジメント計画を保存しました",
  "风险管理计划已保存"
 ],
 "Role-based training assignment and records.": [
  "역할별 교육 배정과 기록.",
  "役割に応じた教育訓練の割当てと記録。",
  "基于角色的培训分配和记录。"
 ],
 "Safety characteristics saved": [
  "안전 특성을 저장했습니다",
  "安全特性を保存しました",
  "安全特征已保存"
 ],
 "Sent for approval": [
  "승인 요청을 보냈습니다",
  "承認を依頼しました",
  "已提交批准"
 ],
 "Unknown": [
  "알 수 없음",
  "不明",
  "未知"
 ],
 "Verification evidence (document no.)": [
  "검증 근거(문서번호)",
  "検証の根拠(文書番号)",
  "验证证据(文件编号)"
 ],
 "AI development and data management plan": [
  "AI 개발 및 데이터 관리 계획",
  "AI 開発・データ管理計画",
  "AI 开发和数据管理计划"
 ],
 "AI model performance evaluation": [
  "AI 모델 성능 평가",
  "AI モデル性能評価",
  "AI 模型性能评价"
 ],
 "Actions": [
  "조치 사항",
  "アクション",
  "措施"
 ],
 "Add design review": [
  "설계 검토 추가",
  "設計レビューを追加",
  "添加设计评审"
 ],
 "Add review": [
  "검토 추가",
  "レビューを追加",
  "添加评审"
 ],
 "Add row": [
  "행 추가",
  "行を追加",
  "添加行"
 ],
 "Add traceability row": [
  "추적성 행 추가",
  "トレーサビリティ行を追加",
  "添加追溯行"
 ],
 "All versions": [
  "전체 버전",
  "すべてのバージョン",
  "全部版本"
 ],
 "Annex II 1 — Device description and specification": [
  "부속서 II 1 — 기기 설명 및 사양",
  "附属書 II 1 — 機器の説明と仕様",
  "附录 II 1 — 器械描述与规格"
 ],
 "Annex II 2 — Information supplied by the manufacturer": [
  "부속서 II 2 — 제조자 제공 정보",
  "附属書 II 2 — 製造業者が提供する情報",
  "附录 II 2 — 制造商提供的信息"
 ],
 "Annex II 3 — Design and manufacturing information": [
  "부속서 II 3 — 설계 및 제조 정보",
  "附属書 II 3 — 設計・製造情報",
  "附录 II 3 — 设计和制造信息"
 ],
 "Annex II 4 — General safety and performance requirements": [
  "부속서 II 4 — 일반 안전 및 성능 요구사항",
  "附属書 II 4 — 一般安全性能要求事項",
  "附录 II 4 — 通用安全和性能要求"
 ],
 "Annex II 5 — Benefit-risk analysis and risk management": [
  "부속서 II 5 — 이익-위험 분석 및 위험관리",
  "附属書 II 5 — ベネフィット・リスク分析とリスクマネジメント",
  "附录 II 5 — 受益-风险分析和风险管理"
 ],
 "Annex II 6.1 — Pre-clinical and clinical data": [
  "부속서 II 6.1 — 비임상 및 임상 자료",
  "附属書 II 6.1 — 非臨床・臨床データ",
  "附录 II 6.1 — 临床前和临床数据"
 ],
 "Annex II 6.2 — Additional information: software": [
  "부속서 II 6.2 — 추가 정보: 소프트웨어",
  "附属書 II 6.2 — 追加情報:ソフトウェア",
  "附录 II 6.2 — 补充信息:软件"
 ],
 "Annex III — Post-market surveillance": [
  "부속서 III — 시판 후 감시",
  "附属書 III — 市販後監視",
  "附录 III — 上市后监督"
 ],
 "Applicable standards and regulatory requirements": [
  "적용 표준 및 규제 요구사항",
  "適用規格と規制要求事項",
  "适用标准和法规要求"
 ],
 "Approval / certificate no.": [
  "허가 / 인증서 번호",
  "承認 / 認証書番号",
  "批准 / 证书编号"
 ],
 "Approval date": [
  "허가일",
  "承認日",
  "批准日期"
 ],
 "Approval no.": [
  "허가번호",
  "承認番号",
  "批准编号"
 ],
 "Approve gate": [
  "게이트 승인",
  "ゲートを承認",
  "批准阶段关口"
 ],
 "Approved with actions": [
  "조건부 승인",
  "条件付き承認",
  "有条件批准"
 ],
 "Authorization record": [
  "허가 기록",
  "承認・認証の記録",
  "注册记录"
 ],
 "Baseline frozen": [
  "베이스라인을 동결했습니다",
  "ベースラインを凍結しました",
  "基线已冻结"
 ],
 "Baselines": [
  "베이스라인",
  "ベースライン",
  "基线"
 ],
 "Biocompatibility": [
  "생물학적 안전성",
  "生物学的安全性",
  "生物相容性"
 ],
 "Clinical evaluation / clinical performance": [
  "임상 평가 / 임상 성능",
  "臨床評価 / 臨床性能",
  "临床评价 / 临床性能"
 ],
 "Closed": [
  "종결",
  "完了",
  "已关闭"
 ],
 "Code": [
  "코드",
  "コード",
  "代码"
 ],
 "Create a new authorization record": [
  "새 허가 기록 만들기",
  "新しい承認・認証記録を作成",
  "新建注册记录"
 ],
 "Cybersecurity testing": [
  "사이버보안 시험",
  "サイバーセキュリティ試験",
  "网络安全测试"
 ],
 "Dataset specification": [
  "데이터셋 명세",
  "データセット仕様",
  "数据集规范"
 ],
 "Date": [
  "날짜",
  "日付",
  "日期"
 ],
 "Deliverable": [
  "산출물",
  "成果物",
  "交付物"
 ],
 "Design and development file (ISO 13485 §7.3.10) — all design records for this product, connected and traceable.": [
  "설계 및 개발 파일(ISO 13485 §7.3.10) — 이 제품의 모든 설계 기록을 서로 연결해 추적할 수 있게 보관합니다.",
  "設計・開発ファイル(ISO 13485 §7.3.10)— この製品のすべての設計記録を相互に紐付け、追跡できるように保管します。",
  "设计和开发文档(ISO 13485 §7.3.10)— 本产品的所有设计记录相互关联、可追溯。"
 ],
 "Design and development plan": [
  "설계 및 개발 계획",
  "設計・開発計画",
  "设计和开发计划"
 ],
 "Design and development": [
  "설계 및 개발",
  "設計・開発",
  "设计和开发"
 ],
 "Design baseline": [
  "설계 베이스라인",
  "設計ベースライン",
  "设计基线"
 ],
 "Design changes": [
  "설계 변경",
  "設計変更",
  "设计变更"
 ],
 "Design file": [
  "설계 파일",
  "設計ファイル",
  "设计文档"
 ],
 "Design input": [
  "설계 입력",
  "設計インプット",
  "设计输入"
 ],
 "Design inputs": [
  "설계 입력",
  "設計インプット",
  "设计输入"
 ],
 "Design output": [
  "설계 출력",
  "設計アウトプット",
  "设计输出"
 ],
 "Design outputs": [
  "설계 출력",
  "設計アウトプット",
  "设计输出"
 ],
 "Design review": [
  "설계 검토",
  "設計レビュー",
  "设计评审"
 ],
 "Design review records": [
  "설계 검토 기록",
  "設計レビュー記録",
  "设计评审记录"
 ],
 "Design reviews": [
  "설계 검토",
  "設計レビュー",
  "设计评审"
 ],
 "Design transfer": [
  "설계 이전",
  "設計移管",
  "设计转换"
 ],
 "Design transfer checklist": [
  "설계 이전 체크리스트",
  "設計移管チェックリスト",
  "设计转换检查单"
 ],
 "Design verification plan and reports": [
  "설계 검증 계획 및 보고서",
  "設計検証計画・報告書",
  "设计验证计划和报告"
 ],
 "Device description": [
  "기기 설명",
  "機器の説明",
  "器械描述"
 ],
 "Draft generated": [
  "초안을 생성했습니다",
  "草案を作成しました",
  "草稿已生成"
 ],
 "Draft refreshed": [
  "초안을 갱신했습니다",
  "草案を更新しました",
  "草稿已更新"
 ],
 "Drafts are written automatically from the design file, product standard, label and risk management file. After approval the final version is locked and kept with the authorization.": [
  "초안은 설계 파일, 제품표준서, 라벨, 위험관리 파일을 바탕으로 자동 작성됩니다. 허가를 받으면 최종본이 잠기고 해당 허가 기록과 함께 보관됩니다.",
  "草案は設計ファイル、製品標準書、ラベル、リスクマネジメントファイルから自動作成されます。承認後は最終版がロックされ、承認・認証記録とともに保管されます。",
  "草稿根据设计文档、产品标准、标签和风险管理文档自动编写。获批后,最终版本将被锁定并与注册记录一起保存。"
 ],
 "Drawings and bill of materials": [
  "도면 및 자재 명세서",
  "図面と部品表",
  "图纸和物料清单"
 ],
 "EU MDR technical documentation (Annex II and III)": [
  "EU MDR 기술문서 (부속서 II, III)",
  "EU MDR 技術文書(附属書 II・III)",
  "EU MDR 技术文档(附录 II 和 III)"
 ],
 "Edit traceability row": [
  "추적성 행 편집",
  "トレーサビリティ行を編集",
  "编辑追溯行"
 ],
 "Edited": [
  "수정됨",
  "編集済み",
  "已编辑"
 ],
 "Edited sections are kept when the draft is refreshed from the design file.": [
  "설계 파일로 초안을 갱신해도 직접 수정한 항목은 유지됩니다.",
  "設計ファイルから草案を更新しても、編集した項目は保持されます。",
  "从设计文档更新草稿时,已编辑的章节会保留。"
 ],
 "Electrical safety": [
  "전기적 안전",
  "電気的安全性",
  "电气安全"
 ],
 "Electrical safety and EMC": [
  "전기적 안전 및 전자파 적합성",
  "電気的安全性と EMC",
  "电气安全和电磁兼容"
 ],
 "Electromagnetic compatibility": [
  "전자파 적합성",
  "電磁両立性",
  "电磁兼容"
 ],
 "FDA 510(k) premarket notification": [
  "FDA 510(k) 시판 전 신고",
  "FDA 510(k) 市販前届出",
  "FDA 510(k) 上市前通告"
 ],
 "Final": [
  "최종본",
  "最終版",
  "最终版"
 ],
 "Freeze baseline": [
  "베이스라인 동결",
  "ベースラインを凍結",
  "冻结基线"
 ],
 "Freeze design file baseline": [
  "설계 파일 베이스라인 동결",
  "設計ファイルのベースラインを凍結",
  "冻结设计文档基线"
 ],
 "Gate approved": [
  "게이트 승인됨",
  "ゲート承認済み",
  "关口已批准"
 ],
 "Gate open": [
  "게이트 진행 중",
  "ゲート未承認",
  "关口未关闭"
 ],
 "Gate reopened — deliverable no longer approved": [
  "산출물 승인이 해제되어 게이트가 다시 열렸습니다",
  "成果物の承認が外れたため、ゲートを再開しました",
  "交付物不再处于批准状态,关口已重新打开"
 ],
 "Generate draft": [
  "초안 생성",
  "草案を作成",
  "生成草稿"
 ],
 "History": [
  "이력",
  "履歴",
  "历史记录"
 ],
 "Impact": [
  "영향",
  "影響",
  "影响"
 ],
 "Independent reviewer": [
  "독립 검토자",
  "独立したレビュー担当者",
  "独立评审人"
 ],
 "Indications for use": [
  "적응증(사용목적)",
  "適応(使用目的)",
  "适应症(预期用途)"
 ],
 "Labeling": [
  "표시기재",
  "表示",
  "标签"
 ],
 "Labelling and instructions for use": [
  "표시기재 및 사용설명서",
  "表示と取扱説明書",
  "标签和使用说明书"
 ],
 "Mark as submitted": [
  "제출 처리",
  "申請済みにする",
  "标记为已提交"
 ],
 "Marked as submitted": [
  "제출 상태로 변경했습니다",
  "申請済みにしました",
  "已标记为已提交"
 ],
 "Missing": [
  "누락",
  "不足",
  "缺失"
 ],
 "Needs evidence": [
  "근거 필요",
  "根拠が必要",
  "需要证据"
 ],
 "No content yet — add it in the design file or edit this section.": [
  "아직 내용이 없습니다 — 설계 파일에서 추가하거나 이 항목을 직접 편집하세요.",
  "まだ内容がありません — 設計ファイルで追加するか、この項目を編集してください。",
  "暂无内容 — 请在设计文档中补充或直接编辑本节。"
 ],
 "No design changes recorded.": [
  "기록된 설계 변경이 없습니다.",
  "設計変更の記録はありません。",
  "没有设计变更记录。"
 ],
 "No design reviews yet.": [
  "아직 설계 검토가 없습니다.",
  "設計レビューはまだありません。",
  "暂无设计评审。"
 ],
 "No rows yet.": [
  "아직 행이 없습니다.",
  "行はまだありません。",
  "暂无行。"
 ],
 "No technical documentation yet. Generate a draft for a market above.": [
  "아직 기술문서가 없습니다. 위에서 국가를 골라 초안을 생성하세요.",
  "技術文書はまだありません。上で国・地域を選んで草案を作成してください。",
  "暂无技术文档。请在上方选择市场生成草稿。"
 ],
 "No technical documentation yet. Open a product and generate a draft.": [
  "아직 기술문서가 없습니다. 제품을 열고 초안을 생성하세요.",
  "技術文書はまだありません。製品を開いて草案を作成してください。",
  "暂无技术文档。请打开产品并生成草稿。"
 ],
 "Not approved": [
  "승인 안 됨",
  "不承認",
  "未批准"
 ],
 "Not started": [
  "시작 전",
  "未着手",
  "未开始"
 ],
 "Notified Body (CE)": [
  "인증기관 (CE)",
  "ノーティファイドボディ(CE)",
  "公告机构(CE)"
 ],
 "Participants": [
  "참석자",
  "参加者",
  "参会人员"
 ],
 "Performance testing — bench": [
  "성능 시험 — 벤치",
  "性能試験 — ベンチ",
  "性能测试 — 台架"
 ],
 "Performance testing — clinical": [
  "성능 시험 — 임상",
  "性能試験 — 臨床",
  "性能测试 — 临床"
 ],
 "Phase": [
  "단계",
  "フェーズ",
  "阶段"
 ],
 "Planning": [
  "계획",
  "計画",
  "策划"
 ],
 "Product standard (design output)": [
  "제품표준서 (설계 출력)",
  "製品標準書(設計アウトプット)",
  "产品标准(设计输出)"
 ],
 "Ready": [
  "준비 완료",
  "準備完了",
  "已就绪"
 ],
 "Record approval": [
  "허가 결과 기록",
  "承認結果を記録",
  "记录批准结果"
 ],
 "Reference": [
  "근거",
  "根拠",
  "依据"
 ],
 "Refresh from design file": [
  "설계 파일로 갱신",
  "設計ファイルから更新",
  "从设计文档更新"
 ],
 "Regulatory impact": [
  "인허가 영향",
  "薬事上の影響",
  "注册影响"
 ],
 "Released version": [
  "출시 버전",
  "リリース版",
  "发布版本"
 ],
 "Risk": [
  "위험",
  "リスク",
  "风险"
 ],
 "Risk control (hazard)": [
  "위험통제 (위해요인)",
  "リスクコントロール(ハザード)",
  "风险控制(危险源)"
 ],
 "Risk control verification": [
  "위험통제 검증",
  "リスクコントロールの検証",
  "风险控制验证"
 ],
 "Risk management summary": [
  "위험관리 요약",
  "リスクマネジメントの要約",
  "风险管理摘要"
 ],
 "Row deleted": [
  "행을 삭제했습니다",
  "行を削除しました",
  "行已删除"
 ],
 "SOUP list": [
  "SOUP 목록",
  "SOUP 一覧",
  "SOUP 清单"
 ],
 "Sign & lock final version": [
  "서명 후 최종본 잠금",
  "署名して最終版をロック",
  "签名并锁定最终版本"
 ],
 "Software architecture and detailed design": [
  "소프트웨어 아키텍처 및 상세 설계",
  "ソフトウェアアーキテクチャと詳細設計",
  "软件架构和详细设计"
 ],
 "Software development plan": [
  "소프트웨어 개발 계획",
  "ソフトウェア開発計画",
  "软件开发计划"
 ],
 "Software documentation": [
  "소프트웨어 문서",
  "ソフトウェア文書",
  "软件文档"
 ],
 "Software release record": [
  "소프트웨어 릴리스 기록",
  "ソフトウェアリリース記録",
  "软件发布记录"
 ],
 "Software requirements specification": [
  "소프트웨어 요구사항 명세",
  "ソフトウェア要求仕様",
  "软件需求规范"
 ],
 "Software system testing": [
  "소프트웨어 시스템 시험",
  "ソフトウェアシステム試験",
  "软件系统测试"
 ],
 "Start amendment": [
  "변경 개정 시작",
  "変更改訂を開始",
  "开始变更修订"
 ],
 "Sterility and shelf life": [
  "멸균 및 유효기간",
  "滅菌と有効期間",
  "无菌和货架期"
 ],
 "Submission date": [
  "제출일",
  "申請日",
  "提交日期"
 ],
 "Substantial equivalence comparison": [
  "실질적 동등성 비교",
  "実質的同等性の比較",
  "实质等同比较"
 ],
 "Summative usability evaluation": [
  "총괄 사용적합성 평가",
  "総括的ユーザビリティ評価",
  "总结性可用性评价"
 ],
 "Superseded by a newer approved version. Kept for reference.": [
  "더 최신 승인본으로 대체되었습니다. 참고용으로 보관합니다.",
  "新しい承認版に置き換えられました。参照用に保管しています。",
  "已被更新的批准版本替代,仅供参考保存。"
 ],
 "Technical Docs": [
  "기술문서",
  "技術文書",
  "技术文档"
 ],
 "Technical docs": [
  "기술문서",
  "技術文書",
  "技术文档"
 ],
 "Technical Documentation": [
  "기술문서",
  "技術文書",
  "技术文档"
 ],
 "Technical documentation": [
  "기술문서",
  "技術文書",
  "技术文档"
 ],
 "Technical documentation by product and market — drafts generated from the design file, and the final versions approved by each authority.": [
  "제품·국가별 기술문서입니다 — 설계 파일로 생성한 초안과, 각 규제기관이 승인한 최종본을 관리합니다.",
  "製品・国別の技術文書です — 設計ファイルから作成した草案と、各規制当局が承認した最終版を管理します。",
  "按产品和市场管理技术文档 — 包括根据设计文档生成的草稿和各监管机构批准的最终版本。"
 ],
 "The final version is locked and linked to the authorization. The design file baseline is recorded with it.": [
  "최종본은 잠기고 허가 기록에 연결됩니다. 설계 파일 베이스라인도 함께 기록됩니다.",
  "最終版はロックされ、承認・認証記録に紐付けられます。設計ファイルのベースラインも併せて記録されます。",
  "最终版本将被锁定并关联到注册记录,同时记录设计文档基线。"
 ],
 "Traceability matrix": [
  "추적성 매트릭스",
  "トレーサビリティマトリックス",
  "追溯矩阵"
 ],
 "Usability engineering plan": [
  "사용적합성 엔지니어링 계획",
  "ユーザビリティエンジニアリング計画",
  "可用性工程计划"
 ],
 "User need": [
  "사용자 요구",
  "ユーザーニーズ",
  "用户需求"
 ],
 "User need → design input → design output → verification → validation → risk control.": [
  "사용자 요구 → 설계 입력 → 설계 출력 → 검증 → 밸리데이션 → 위험통제.",
  "ユーザーニーズ → 設計インプット → 設計アウトプット → 検証 → バリデーション → リスクコントロール。",
  "用户需求 → 设计输入 → 设计输出 → 验证 → 确认 → 风险控制。"
 ],
 "User needs and design input requirements": [
  "사용자 요구 및 설계 입력 요구사항",
  "ユーザーニーズと設計インプット要求事項",
  "用户需求和设计输入要求"
 ],
 "View final": [
  "최종본 보기",
  "最終版を表示",
  "查看最终版"
 ],
 "deliverables approved": [
  "승인된 산출물",
  "承認済み成果物",
  "已批准交付物"
 ],
 "design baseline": [
  "설계 베이스라인",
  "設計ベースライン",
  "设计基线"
 ],
 "drafts": [
  "초안",
  "草案",
  "草稿"
 ],
 "e.g. Design output review": [
  "예: 설계 출력 검토",
  "例:設計アウトプットのレビュー",
  "例如:设计输出评审"
 ],
 "final (approved) versions": [
  "최종(허가) 버전",
  "最終(承認)版",
  "最终(获批)版本"
 ],
 "frozen baseline": [
  "동결된 베이스라인",
  "凍結済みベースライン",
  "已冻结基线"
 ],
 "missing": [
  "누락",
  "不足",
  "缺失"
 ],
 "need evidence": [
  "근거 필요",
  "根拠が必要",
  "需要证据"
 ],
 "phase gates approved": [
  "승인된 단계 게이트",
  "承認済みフェーズゲート",
  "已批准的阶段关口"
 ],
 "sections ready": [
  "준비된 항목",
  "準備完了の項目",
  "已就绪章节"
 ],
 "traceability gaps": [
  "추적성 누락",
  "トレーサビリティの欠落",
  "追溯缺口"
 ],
 "under review": [
  "심사 중",
  "審査中",
  "审核中"
 ],
 "markets": [
  "국가",
  "国・地域",
  "市场"
 ],
 "§7.3.5 — someone not directly responsible for the stage under review": [
  "§7.3.5 — 검토 대상 단계에 직접 책임이 없는 사람",
  "§7.3.5 — レビュー対象の段階に直接責任を持たない人",
  "§7.3.5 — 不直接负责被评审阶段的人员"
 ],
 "All deliverables approved": [
  "모든 산출물 승인 완료",
  "すべての成果物が承認済み",
  "所有交付物已批准"
 ],
 "All deliverables of this phase are approved. Signing closes the phase (design review gate).": [
  "이 단계의 모든 산출물이 승인되었습니다. 서명하면 단계가 종료됩니다(설계 검토 게이트).",
  "このフェーズのすべての成果物が承認されました。署名するとフェーズが完了します(設計レビューゲート)。",
  "本阶段所有交付物均已批准。签名后该阶段关闭(设计评审关口)。"
 ],
 "MFDS technical documentation (기술문서)": [
  "식약처 기술문서",
  "MFDS 技術文書(韓国)",
  "MFDS 技术文档(韩国)"
 ]
};

  /* ---------- engine ---------- */
  const LANGS = [
    { id: 'en', name: 'English', native: 'English' },
    { id: 'ko', name: 'Korean', native: '한국어' },
    { id: 'ja', name: 'Japanese', native: '日本語' },
    { id: 'zh', name: 'Chinese (Simplified)', native: '中文(简体)' }
  ];
  const IDX = { ko: 0, ja: 1, zh: 2 };
  const KEY = 'qx-lang';
  let cur = 'en';
  try { const v = localStorage.getItem(KEY); if (v && LANGS.some((l) => l.id === v)) cur = v; } catch (e) { /* storage unavailable */ }
  const lower = {};
  Object.keys(DICT).forEach((k) => { lower[k.toLowerCase()] = DICT[k]; });

  // dynamic phrases: [regex, ko, ja, zh] — $1, $2 are translated recursively when possible
  const PATTERNS = [
    [/^Welcome back, (.+)\. This view shows what your role \((.+)\) can access\.$/, '$1님, 환영합니다. 현재 역할($2)에서 볼 수 있는 화면입니다.', '$1 さん、おかえりなさい。あなたのロール($2)で利用できる画面です。', '$1,欢迎回来。此视图显示您的角色($2)可访问的内容。'],
    [/^Due (.+)$/, '기한 $1', '期限 $1', '截止 $1'],
    [/^since (.+)$/, '$1부터', '$1から', '自 $1'],
    [/^effective (.+)$/, '시행 $1', '発効 $1', '生效 $1'],
    [/^approved by (.+)$/, '승인 $1', '承認 $1', '批准人 $1'],
    [/^target (≥|≤) (.+)$/, '목표 $1 $2', '目標 $1 $2', '目标 $1 $2'],
    [/^(\d+) forms?$/, '서식 $1개', '様式 $1件', '$1 个表单'],
    [/^(\d+) \/ (\d+) sections$/, '$1 / $2 항목', '$1 / $2 項目', '$1 / $2 节'],
    [/^(\d+) quality documents$/, '품질문서 $1건', '品質文書 $1件', '$1 份质量文件'],
    [/^(\d+) processes$/, '프로세스 $1개', 'プロセス $1件', '$1 个流程'],
    [/^(\d+) people$/, '구성원 $1명', 'メンバー $1名', '$1 名人员'],
    [/^(\d+) groups$/, '$1개 그룹', '$1 グループ', '$1 个流程组'],
    [/^(\d+) manuals?$/, '매뉴얼 $1', 'マニュアル $1', '手册 $1'],
    [/^(\d+) procedures$/, '절차서 $1', '手順書 $1', '程序文件 $1'],
    [/^(\d+) hazards$/, '위해요인 $1', 'ハザード $1', '危险源 $1'],
    [/^(\d+) unacceptable residual$/, '수용 불가 잔여 $1', '受容不可の残留 $1', '不可接受剩余 $1'],
    [/^(\d+) residual$/, '잔여 $1', '残留 $1', '剩余 $1'],
    [/^(\d+)\/(\d+) controls verified$/, '통제 조치 $1/$2 검증', 'コントロール $1/$2 検証済み', '控制措施 $1/$2 已验证'],
    [/^(\d+) overdue$/, '$1건 기한 초과', '$1件 期限超過', '$1 项逾期'],
    [/^Renew (\w+) authorization$/, '$1 허가 갱신', '$1 承認・認証の更新', '$1 注册续期'],
    [/^Waiting for review by (.+)\.$/, '$1님의 검토를 기다리는 중입니다.', '$1 さんのレビュー待ちです。', '等待 $1 评审。'],
    [/^Waiting for approval by (.+)\.$/, '$1님의 승인을 기다리는 중입니다.', '$1 さんの承認待ちです。', '等待 $1 批准。'],
    [/^Rev\.(\d+) requires every user to confirm they have read and understood the change\.$/, 'Rev.$1은 모든 사용자가 변경 내용을 읽고 이해했음을 확인해야 합니다.', 'Rev.$1 は、すべての利用者が変更内容を読んで理解したことの確認が必要です。', 'Rev.$1 要求所有用户确认已阅读并理解变更内容。'],
    [/^(Rev\.\d+) (.+)$/, '$1 $2', '$1 $2', '$1 $2'],
    [/^Hi (.+)$/, '$1님', '$1 さん', '$1'],
    [/^(\d+) ready$/, '준비 완료 $1', '準備完了 $1', '已就绪 $1'],
    [/^(\d+) need evidence$/, '근거 필요 $1', '根拠が必要 $1', '需要证据 $1'],
    [/^(\d+) missing$/, '누락 $1', '不足 $1', '缺失 $1'],
    [/^(\d+) rows$/, '$1행', '$1 行', '$1 行'],
    [/^(\d+) gaps$/, '누락 $1', '欠落 $1', '缺口 $1'],
    [/^no gaps$/, '누락 없음', '欠落なし', '无缺口'],
    [/^Open v(.+)$/, 'v$1 열기', 'v$1 を開く', '打开 v$1'],
    [/^Final v(.+)$/, '최종본 v$1', '最終版 v$1', '最终版 v$1'],
    [/^Tech doc v(.+)$/, '기술문서 v$1', '技術文書 v$1', '技术文档 v$1'],
    [/^Approve design gate: (.+)$/, '설계 게이트 승인: $1', '設計ゲートの承認:$1', '批准设计关口:$1'],
    [/^Participants: (.+)$/, '참석자: $1', '参加者:$1', '参会人员:$1'],
    [/^Independent reviewer: (.+)$/, '독립 검토자: $1', '独立レビュー担当者:$1', '独立评审人:$1'],
    [/^Actions: (.+)$/, '조치 사항: $1', 'アクション:$1', '措施:$1'],
    [/^(.+) review records?$/, '설계 검토 기록 $1건', '設計レビュー記録 $1件', '设计评审记录 $1 份'],
    [/^Owner (.+)$/, '담당 $1', '担当 $1', '负责 $1'],
    [/^Signer: (.+)$/, '서명자: $1', '署名者:$1', '签名人:$1'],
    [/^Meaning: (.+)$/, '서명 의미: $1', '署名の意味:$1', '签名含义:$1'],
    [/^approval of (.+)$/, '$1 승인', '$1 の承認', '批准 $1'],
    [/^Version (.+)$/, '버전 $1', 'バージョン $1', '版本 $1'],
    [/^(.+) \(Demo\)$/, '$1 (데모)', '$1(デモ)', '$1(演示)'],
    [/^([★→⚠]) (.+)$/, '$1 $2', '$1 $2', '$1 $2'],
    [/^\[(.+?)\] (.+)$/, '[$1] $2', '[$1] $2', '[$1] $2'],
    [/^(.+) team and QMS responsibilities\.$/, '$1 구성원과 QMS 책임입니다.', '$1 のメンバーと QMS 上の責任です。', '$1 团队成员及其 QMS 职责。'],
    [/^(.+) controlled documents — current effective revisions\. Source: (.+)\.$/, '$1 관리 문서 — 현재 시행 중인 개정본입니다. 출처: $2.', '$1 の管理文書 — 現行の有効版です。出典:$2。', '$1 受控文件 — 当前有效版本。来源:$2。'],
    [/^(.+) QMS processes from the Quality Manual \((\w+)\)\. Measurement & improvement outputs feed management review, whose decisions change the core and support processes\.$/, '품질매뉴얼($2)에 따른 $1 QMS 프로세스입니다. 측정 및 개선 결과는 경영검토로 이어지고, 경영검토 결정이 핵심·지원 프로세스를 바꿉니다.', '品質マニュアル($2)に基づく $1 の QMS プロセスです。測定と改善の結果はマネジメントレビューに入り、その決定がコア・支援プロセスを変えます。', '基于质量手册($2)的 $1 QMS 流程。测量与改进的输出进入管理评审,其决定将改变核心和支持过程。'],
    [/^(\d+) initially unacceptable$/, '초기 수용 불가 $1', '初期受容不可 $1', '初始不可接受 $1'],
    [/^(\d+) control measures \((\d+) fully verified\)$/, '통제 조치 $1 (검증 완료 $2)', 'コントロール手段 $1(検証完了 $2)', '控制措施 $1(已完全验证 $2)'],
    [/^Other (.+)$/, '기타 $1', 'その他の$1', '其他$1'],
    [/^Evidence: (.+)$/, '근거: $1', '根拠:$1', '证据:$1'],
    [/^Impl\. (.)$/, '이행 $1', '実施 $1', '实施 $1'],
    [/^Eff\. (.)$/, '유효성 $1', '有効性 $1', '有效性 $1'],
    [/^(\d+)\. (.+)$/, '$1. $2', '$1. $2', '$1. $2'],
    [/^(.+) \(([A-Z]{2,5})\)$/, '$1 ($2)', '$1($2)', '$1($2)'],
    [/^(\d) ([A-Z][a-z]+)$/, '$1 $2', '$1 $2', '$1 $2']
  ];
  const EXTRA = { ko: {}, ja: {}, zh: {} };
  function extend(l, map) { Object.assign(EXTRA[l], map); }
  function look(s) {
    const x = EXTRA[cur] && EXTRA[cur][s]; if (x) return x;
    const r = DICT[s] || lower[s.toLowerCase()];
    return r ? r[IDX[cur]] : null;
  }
  function t(s) {
    if (cur === 'en' || s == null) return s;
    s = String(s);
    const exact = look(s); if (exact) return exact;
    let m;
    if ((m = s.match(/^\/ (.+)$/))) return '/ ' + t(m[1]);
    if ((m = s.match(/^(.*?)(\s*[·:.])$/)) && m[1]) { const x = look(m[1]); if (x) return x + m[2]; }
    if (s.includes(' · ')) {
      const parts = s.split(' · '); const out = parts.map((x) => t(x));
      if (out.some((x, i) => x !== parts[i])) return out.join(' · ');
    }
    for (const p of PATTERNS) {
      const mm = s.match(p[0]);
      if (mm) return p[1 + IDX[cur]].replace(/\$(\d)/g, (_, i) => { const v = mm[Number(i)]; const tv = t(v); return tv; });
    }
    return s;
  }
  const ATTRS = ['placeholder', 'title', 'aria-label'];
  function tr(root) {
    if (cur === 'en' || !root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach((node) => {
      const p = node.parentElement;
      if (!p || p.closest('script, style, textarea, pre, .no-tr')) return;
      const raw = node.nodeValue; const s = raw.trim();
      if (!s || !/[A-Za-z]{2}/.test(s)) return;
      const v = t(s);
      if (v !== s) {
        if (p.tagName === 'OPTION' && !p.hasAttribute('value')) p.setAttribute('value', p.textContent);
        node.nodeValue = raw.replace(s, v);
      }
    });
    root.querySelectorAll('[placeholder], [title], [aria-label]').forEach((el) => {
      if (el.closest('.no-tr')) return;
      ATTRS.forEach((a) => { const v = el.getAttribute(a); if (v) { const x = t(v); if (x !== v) el.setAttribute(a, x); } });
    });
  }
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function date(d, withTime) {
    const p = (x) => String(x).padStart(2, '0');
    const time = withTime ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : '';
    if (cur === 'ko') return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일${time}`;
    if (cur === 'ja' || cur === 'zh') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日${time}`;
    return `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}${time}`;
  }
  function set(l) {
    if (!LANGS.some((x) => x.id === l)) return;
    cur = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* keep in memory */ }
    document.documentElement.lang = l === 'zh' ? 'zh-Hans' : l;
  }
  document.documentElement.lang = cur === 'zh' ? 'zh-Hans' : cur;
  return { LANGS, t, tr, date, set, extend, get lang() { return cur; } };
})();
