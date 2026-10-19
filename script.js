// ===== NAVIGASI =====
function keHalaman(namaHalaman) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(namaHalaman).classList.add('active');
    const navBtn = document.querySelector(`.nav-btn[data-page="${namaHalaman}"]`);
    if (navBtn) navBtn.classList.add('active');
}

// Navbar klik
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => keHalaman(btn.dataset.page));
});

// Menu beranda klik
document.querySelectorAll('.menu-card').forEach(btn => {
    btn.addEventListener('click', () => keHalaman(btn.dataset.goto));
});

// ===== TOMBOL + DAN - SERAGAM =====
document.querySelectorAll('.plus').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('.qty-input');
        input.value = parseInt(input.value) + 1;
        updateJumlahBeli();
    });
});

document.querySelectorAll('.minus').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('.qty-input');
        if (parseInt(input.value) > 0) input.value = parseInt(input.value) - 1;
        updateJumlahBeli();
    });
});

document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('input', updateJumlahBeli);
});

// ===== HITUNG TOTAL JUMLAH BAJU =====
function updateJumlahBeli() {
    let total = 0;
    document.querySelectorAll('.qty-input').forEach(input => {
        total += parseInt(input.value) || 0;
    });
    const jmlBeli = document.getElementById('jmlBeli');
    if (jmlBeli) jmlBeli.value = total;
}

// ===== PINDAH KE FORM SERAGAM =====
document.getElementById('keFormSeragam').addEventListener('click', () => {
    updateJumlahBeli();
    keHalaman('form-seragam');
});

// ===== SIMPAN SERAGAM KE TRANSAKSI =====
document.getElementById('bayarSeragam').addEventListener('click', () => {
    const nama = document.getElementById('namaSiswa').value || '-';
    const jml = document.getElementById('jmlBeli').value || 0;
    const ukuran = Array.from(document.querySelectorAll('.ukuran:checked')).map(c => c.value).join(', ') || '-';
    const jk = document.getElementById('jenisKelamin').value || '-';
    const no = document.getElementById('noKredit').value || '-';

    // Detail barang
    let barang = [];
    document.querySelectorAll('.qty-input').forEach(inp => {
        if (parseInt(inp.value) > 0) {
            barang.push(`• ${inp.dataset.name}: ${inp.value} buah`);
        }
    });
    const detailText = barang.length > 0 ? barang.join('<br>') : '-';

    // Tampilkan ke Transaksi
    document.getElementById('t_namaSiswa').textContent = nama;
    document.getElementById('t_jmlBeli').textContent = jml;
    document.getElementById('t_detailBarang').innerHTML = detailText;
    document.getElementById('t_ukuran').textContent = ukuran;
    document.getElementById('t_jk').textContent = jk;
    document.getElementById('t_noKredit').textContent = no;

    keHalaman('transaksi');
});

// ===== SIMPAN SPP =====
document.getElementById('bayarSpp').addEventListener('click', () => {
    const bulan = Array.from(document.querySelectorAll('.bulan-spp:checked')).map(c => c.value).join(', ') || '-';
    const nama = document.getElementById('namaSpp').value || '-';
    const kelas = document.getElementById('kelasSpp').value || '-';
    const norek = document.getElementById('norekSpp').value || '-';

    document.getElementById('t_namaSpp').textContent = nama;
    document.getElementById('t_kelasSpp').textContent = kelas;
    document.getElementById('t_bulanSpp').textContent = bulan;
    document.getElementById('t_norekSpp').textContent = norek;

    keHalaman('transaksi');
});

// ===== SIMPAN UJIAN =====
document.getElementById('bayarUjian').addEventListener('click', () => {
    const ujian = Array.from(document.querySelectorAll('.ujian-check:checked')).map(c => c.value).join(', ') || '-';
    const nama = document.getElementById('namaUjian').value || '-';
    const kelas = document.getElementById('kelasUjian').value || '-';
    const norek = document.getElementById('norekUjian').value || '-';

    document.getElementById('t_namaUjian').textContent = nama;
    document.getElementById('t_kelasUjian').textContent = kelas;
    document.getElementById('t_jenisUjian').textContent = ujian;
    document.getElementById('t_norekUjian').textContent = norek;

    keHalaman('transaksi');
});

document.addEventListener("DOMContentLoaded", function () {
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");
    const qtyInputs = document.querySelectorAll(".qty-input");

    // Fungsi update jumlah & harga
    function updateTotal() {
        let totalQty = 0;
        let totalPrice = 0;

        qtyInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            const price = parseInt(input.getAttribute("data-price")) || 0;

            totalQty += qty;
            totalPrice += qty * price;
        });

        // Tampilkan di Form Pembelian
        const jmlBeliInput = document.getElementById("jmlBeli");
        const totalHargaInput = document.getElementById("totalHarga");

        if (jmlBeliInput) jmlBeliInput.value = totalQty;
        if (totalHargaInput) totalHargaInput.value = "Rp " + totalPrice.toLocaleString("id-ID");
    }

    // Tombol Tambah (+)
    plusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector(".qty-input");
            input.value = parseInt(input.value) + 1;
            updateTotal();
        });
    });

    // Tombol Kurang (-)
    minusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector(".qty-input");
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
                updateTotal();
            }
        });
    });

    // Event jika angka diketik langsung di input
    qtyInputs.forEach(input => {
        input.addEventListener("input", function () {
            if (parseInt(this.value) < 0 || isNaN(this.value)) {
                this.value = 0;
            }
            updateTotal();
        });
    });
});

document.getElementById('keFormSeragam').addEventListener('click', function() {
    let totalQty = 0;
    let totalPrice = 0;
    let rincianHTML = '';

    // Ambil semua input jumlah dari halaman seragam
    const qtyInputs = document.querySelectorAll('#seragam .qty-input');

    qtyInputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        const nama = input.getAttribute('data-name');
        const harga = parseInt(input.getAttribute('data-price')) || 0;

        if (qty > 0) {
            totalQty += qty;
            const subtotal = qty * harga;
            totalPrice += subtotal;
            
            // Buat baris rincian
            rincianHTML += `<div>• ${nama} (${qty}x) : Rp ${subtotal.toLocaleString('id-ID')}</div>`;
        }
    });

    // Masukkan data ke Form Pembelian
    document.getElementById('jmlBeli').value = totalQty;
    document.getElementById('totalHarga').value = 'Rp ' + totalPrice.toLocaleString('id-ID');
    
    const boxRincian = document.getElementById('rincianBaju');
    if (rincianHTML !== '') {
        boxRincian.innerHTML = rincianHTML;
    } else {
        boxRincian.innerHTML = 'Belum ada barang dipilih';
    }

    // Pindah ke halaman form
    keHalaman('form-seragam');
});