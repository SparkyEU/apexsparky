	pagecode:`void charge_rifle_hack(uint64_t entity_ptr)
{
	extern uint64_t g_Base;
	extern bool shooting;
	WeaponXEntity curweap = WeaponXEntity();
	curweap.update(entity_ptr);
	float BulletSpeed = curweap.get_projectile_speed();
	int ammo = curweap.get_ammo();

	if (ammo != 0 && BulletSpeed == 1 && shooting)
	{
		apex_mem.Write<float>(g_Base + OFFSET_TIMESCALE + 0x68, std::numeric_limits<float>::min());
	}
	else
	{
		apex_mem.Write<float>(g_Base + OFFSET_TIMESCALE + 0x68, 1.f);
	}
}`;
