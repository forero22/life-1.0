/**
 * Ionic Capacitor Full App in Angular  (https://store.enappd.com/product/capacitor-full-app-with-ionic-angular)

 *
 * Copyright © 2020-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
export class UserModel {
  public id: string;
  public email: string;
  public username?: string;
  constructor(id: string, email: string, username?: string) {
    this.id = id;
    this.email = email;
    this.username = username;
  }

  public static fromDto(user: UserDto): UserModel {
    return new UserModel(user.id, user.email, user.username);
  }

  public static emptyDto(): UserDto {
    return {
      id: null,
      email: null,
      username: null
    };
  }

  public toDto(): UserDto {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }
}

export interface UserDto {
  id: string;
  username?: string;
  email: string;
}
