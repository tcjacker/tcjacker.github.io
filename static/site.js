// 复制按钮：<button data-copy="文本" data-copied="已复制"> 或 data-copy-from="#元素id"
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy], [data-copy-from]");
  if (!btn) return;
  const src = btn.dataset.copyFrom ? document.querySelector(btn.dataset.copyFrom) : null;
  const text = src ? (src.value ?? src.textContent) : btn.dataset.copy;
  try {
    await navigator.clipboard.writeText(text);
    const old = btn.textContent;
    btn.textContent = btn.dataset.copied || "✓";
    setTimeout(() => { btn.textContent = old; }, 1600);
  } catch {
    if (src && src.select) src.select();
  }
});

// 首页视频：静音自动循环播放；用户设置了“减少动态效果”时不自动播放，改为显示播放控件
for (const v of document.querySelectorAll("video[data-autoplay]")) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    v.controls = true;
  } else {
    v.autoplay = true;
    v.play().catch(() => { v.controls = true; });
  }
}

// 后台：改状态的下拉框选中后直接提交
document.addEventListener("change", (e) => {
  if (e.target.matches("[data-autosubmit]")) e.target.form.submit();
});
