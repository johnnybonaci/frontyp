import {
  type AuthUserAsJsonType,
  type AuthUserFromAPIType,
  type AuthUserFromBrowserType,
  type UserType,
} from '../types'
import Permission from './Permission.ts'

class AuthUser {
  id: string | null
  email: string
  role: string
  isAdmin: boolean
  permissions: Permission[]
  active: boolean
  type: UserType
  isCMToolUser: boolean
  name: string

  constructor(
    id: string | null,
    email: string,
    name: string,
    isAdmin: boolean = false,
    type: UserType,
    role: string,
    active: boolean,
    permissions: Permission[],
    isCMToolUser: boolean
  ) {
    this.id = id
    this.email = email
    this.role = role
    this.name = name
    this.type = type
    this.isAdmin = isAdmin
    this.active = active
    this.permissions = permissions
    this.isCMToolUser = isCMToolUser
  }

  get isFull(): boolean {
    return !!this.id && this.permissions.length > 0
  }

  get isMetaUser(): boolean {
    return this.type === 'MetaUser'
  }

  get isClientUser(): boolean {
    return this.type === 'ClientUser'
  }

  get asJson(): AuthUserAsJsonType {
    return {
      id: this.id,
      email: this.email,
      isAdmin: this.isAdmin,
      name: this.name,
      type: this.type,
      role: this.role,
      active: this.active,
      isCMToolUser: this.isCMToolUser,
    }
  }

  static fromBrowser({
    id = null,
    email = '',
    role = '',
    name = '',
    isAdmin = false,
    active = false,
    type = 'MetaUser',
    isCMToolUser = true,
  }: AuthUserFromBrowserType): AuthUser {
    return new AuthUser(id, email, name, isAdmin, type, role, active, [], isCMToolUser)
  }

  static fromAPI({
    id = null,
    email = '',
    role = '',
    fullName = '',
    isAdmin = false,
    active = false,
    isCMToolUser = true,
    type = 'MetaUser',
    permissions = [],
  }: AuthUserFromAPIType): AuthUser {
    return new AuthUser(
      id,
      email,
      fullName,
      isAdmin,
      type,
      role,
      active,
      permissions?.map((permission) => Permission.fromAPI(permission)),
      isCMToolUser
    )
  }
}

export default AuthUser
