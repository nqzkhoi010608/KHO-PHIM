insert into public.genres (slug, name) values
  ('hanh-dong', 'Hành động'), ('tam-ly', 'Tâm lý'), ('kinh-di', 'Kinh dị'), ('khoa-hoc-vien-tuong', 'Khoa học viễn tưởng'), ('hai', 'Hài'), ('hoat-hinh', 'Hoạt hình'), ('phieu-luu', 'Phiêu lưu')
on conflict (slug) do nothing;

insert into public.countries (slug, name) values
  ('my', 'Mỹ'), ('han-quoc', 'Hàn Quốc'), ('nhat-ban', 'Nhật Bản'), ('phap', 'Pháp'), ('anh', 'Anh'), ('canada', 'Canada'), ('latvia', 'Latvia')
on conflict (slug) do nothing;

insert into public.system_settings (key, value, description) values
  ('catalog_mode', '{"value":"demo"}', 'demo | vsmov'),
  ('progress_flush_seconds', '{"value":30}', 'Client progress flush interval')
on conflict (key) do nothing;
