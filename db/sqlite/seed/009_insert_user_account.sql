INSERT INTO
    user_account (username, role_id, is_site, is_sponsor)
VALUES
    ('AdminWithAllRoles', 1, 1, 1),
    ('AdminWithSiteRole', 1, 1, 0),
    ('AdminWithSponsorRole', 1, 0, 1),
    ('AdminWithNoSpecialRoles', 1, 0, 0),
    ('UserWithAllRoles', 2, 1, 1),
    ('UserWithSiteRole', 2, 1, 0),
    ('UserWithSponsorRole', 2, 0, 1),
    ('UserWithNoSpecialRoles', 2, 0, 0);