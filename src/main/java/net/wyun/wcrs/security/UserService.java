package net.wyun.wcrs.security;

import net.wyun.wcrs.model.Account;

public interface UserService {
    void save(Account user);

    Account findByUsername(String username);
}
