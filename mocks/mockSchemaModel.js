'use strict'

const MockSchema = require('./mockSchema')
const ObjectId = require('mongoose').Types.ObjectId

const Employee = require('./mockCommonSchemaModel').Employee
const ServiceQuoteRequest = require('./mockServiceQuoteRequestModel').ServiceQuoteRequest
const Workflows = require('./mockWorkflowsModel').Workflows

class DealDocument extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.id = this.id || '62ea7ca93144eb00883f00a3'
    this.docId = this.docId || '5e6bf451b5b022008c7308fc'
    this.name = this.name || 'Microsoft Data Center Opportunity'
    this.ext = this.ext || 'docx'
    this.purpose = this.purpose || 'LOE'

    this._id = ObjectId(this.id)
  }

  static async create(values = {}) {
    return new DealDocument(values)
  }
}

class ReferenceLink extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.name = this.name || 'Google'
    this.url = this.url || 'http://www.google.com'
    this.tags = this.tags || []
  }

  static async create(values = {}) {
    return new ReferenceLink(values)
  }
}

class Folder extends MockSchema {
  constructor(values = {}) {
    super(values)
  }

  static async create(values = {}) {
    return new Folder(values)
  }
}

class Reminder extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.dealId = this.dealId || ObjectId('5c0ff2e1ebe5930970247406')
    this.workflowId = this.workflowId || 'engagement-west'
  }

  static async create(values = {}) {
    return new Reminder(values)
  }
}

class RoleAssignment extends MockSchema {
  constructor(values = {}) {
    super(values)
  }

  static async create(values = {}) {
    return new RoleAssignment(values)
  }
}

class HardwareQuote extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.countries = this.countries || []
    this.documentRefs = this.documentRefs || []
  }

  static async create(values = {}) {
    return new HardwareQuote(values)
  }
}

class GlobalSupportRequest extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.countries = this.countries || []
    this.documentRefs = this.documentRefs || []
  }

  static async create(values = {}) {
    return new GlobalSupportRequest(values)
  }
}

class CategoryTopic extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.topics = this.topics || []
  }

  static async create(values = {}) {
    return new CategoryTopic(values)
  }
}

class Solution extends MockSchema {
  constructor(values = {}) {
    super(values)

    //What mongo typically adds
    this.oems = this.oems || []
    this.serviceLines = this.serviceLines || []
    this.categoryTopics = this.categoryTopics || []
    this.who = this.who || {}

    //Required fields in the schema
    this._id = parseInt(this._id) || parseInt(Math.random() * 1000)
    this.dealId = this.dealId || '34at5'
    this.name = this.name || 'Unified Field Theory'
    this.owner = this.owner || { fullName: 'Test Dude', userName: 'dudete', wwtUserId: 1, employeeNumber: '100' }
  }

  static async create(values = {}) {
    return new Solution(values)
  }
}

class Task extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.workflowId = this.workflowId || 'engagement-west'
    this.category = this.category || 'Sales Qualification'
    this.description = this.description || 'Sales Qualification'
    this.phase = this.phase || 'Intake'
  }

  static async create(values = {}) {
    return new Task(values)
  }
}

class Financial extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.hardwareRevenue = this.hardwareRevenue || 0
    this.hardwareGrossProfit = this.hardwareGrossProfit || 0
    this.hardwareGrossMargin = this.hardwareGrossMargin || 0
    this.servicesRevenue = this.servicesRevenue || 0
    this.servicesGrossProfit = this.servicesGrossProfit || 0
    this.servicesGrossMargin = this.servicesGrossMargin || 0
    this.totalRevenue = this.totalRevenue || 0
    this.totalGrossProfit = this.totalGrossProfit || 0
    this.totalGrossMargin = this.totalGrossMargin || 0
  }

  static async create(values = {}) {
    return new Financial(values)
  }
}

class TeamMember extends Employee {
  constructor(values = {}) {
    super(values)

    this.role = this.role || null
    this.tags = this.tags || []
  }

  static async create(values = {}) {
    return new TeamMember(values)
  }
}

class Deal extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.teamMembers = this.teamMembers || []
    this.documents = this.documents || []
    this.referenceLinks = this.referenceLinks || []
    this.countries = this.countries || []
    this.folders = this.folders || []
    this.srcType = this.srcType || []
    this.securityClearances = this.securityClearances || []
    this.solutionCategoryTopics = this.solutionCategoryTopics || []
    this.workflows = this.workflows || new Workflows()
    this.financials = this.financials || { estimated: new Financial(), submitted: new Financial(), won: new Financial(), calculated: new Financial()}
    this.who = this.who || {}
  }

  static async create(values = {}) {
    return new Deal(values)
  }
}

class ServiceSupportRequest extends MockSchema {
  constructor(values = {}) {
    super(values)

    this._id = parseInt(this._id) || parseInt(Math.random() * 1000)
    this.dealId = this.dealId || '5c0ff2e1ebe5930970247505'
    this.irId = this.irId || 'deal34at5ir'
    this.irTypeId = this.irTypeId || '0123I0000000Iw0QAE'
    this.type = this.type || 'CS Permissions'
    this.solutionId = parseInt(this.solutionId) || parseInt(Math.random() * 1000)
    this.irNumber = this.irNumber || 'FAKEIR001'
    this.irOwnerId = this.irOwnerId || 'test'
  }

  static async create(values = {}) {
    return new ServiceSupportRequest(values)
  }
}

class Account extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.who = this.who || {updatedBy: new Date()}
    this.accountId = this.accountId || 'tes123'
    this.name = this.name || 'singhrau'
    this.ownerId = this.ownerId || 'test4321'
    this.ownerLdap = this.ownerLdap || 'singhrau'
    this.businessSegment = this.businessSegment || 'wwt'
    this.corporateSegment = this.corporateSegment || 'wwt'
  }

  static async create(values = {}) {
    return new Account(values)
  }
}

class Tag extends MockSchema {
  constructor(values = {}) {
    super(values)
    this._id = this._id || 'application-services'
  }

  static async create(values = {}) {
    return new Tag(values)
  }
}

module.exports = {
  DealDocument,
  ReferenceLink,
  Folder,
  Employee,
  TeamMember,
  HardwareQuote,
  GlobalSupportRequest,
  CategoryTopic,
  ServiceQuoteRequest,
  Solution,
  Deal,
  Reminder,
  RoleAssignment,
  Task,
  Financial,
  ServiceSupportRequest,
  Account,
  Tag
}
