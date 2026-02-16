/**
 * VFC Form Shared Component
 * Shared functions for complaint.html, compliment.html, suggestion.html
 * 
 * Usage:
 *   <script src="../../function/user/components/vfc-form.js"></script>
 *   <script>
 *     VFCForm.init({ detailPrefix: 'complaint' });
 *   </script>
 */

const VFCForm = (function() {
    'use strict';

    // ========================================
    // Organization Data (Single Source of Truth)
    // ========================================
    
    const HDQ_DEPARTMENTS = [
        { value: '', label: 'เลือกฝ่าย', placeholder: true, disabled: true },
        { value: 'BE', label: 'ฝ่ายสำนักเลขานุการ (BE)' },
        { value: 'BF', label: 'ฝ่ายบัญชีและการเงิน (BF)' },
        { value: 'BG', label: 'ฝ่ายปฏิบัติการภาคพื้น (BG)' },
        { value: 'BH', label: 'ฝ่ายทรัพยากรบุคคล (BH)' },
        { value: 'BI', label: 'ฝ่ายเทคโนโลยีสารสนเทศ (BI)' },
        { value: 'BL', label: 'ฝ่ายกฎหมาย (BL)' },
        { value: 'BD', label: 'ฝ่ายจัดซื้อ (BD)' },
        { value: 'BS', label: 'ฝ่ายมาตรฐาน (BS)' },
        { value: 'BR', label: 'ฝ่ายพัฒนาธุรกิจและลูกค้าสัมพันธ์ (BR)' }
    ];
    
    const STATION_DEPARTMENTS = [
        { value: '', label: 'เลือกฝ่าย', placeholder: true, disabled: true },
        { value: 'BG', label: 'ฝ่ายปฏิบัติการภาคพื้น (BG)' },
        { value: 'BS', label: 'ฝ่ายมาตรฐาน (BS)' },
        { value: 'BI', label: 'ฝ่ายเทคโนโลยีสารสนเทศ (BI)' }
    ];
    
    const DEFAULT_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true }
    ];
    
    const BKK_BG_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'GA', label: 'แผนกบริการผู้โดยสารภาคพื้น (GA)' },
        { value: 'GB', label: 'แผนกควบคุมระวางบรรทุก (GB)' },
        { value: 'GC', label: 'แผนกห้องรับรองพิเศษผู้โดยสาร (GC)' },
        { value: 'GD', label: 'แผนกบริการลานจอด (GD)' },
        { value: 'GE', label: 'แผนกบริการลูกค้า (GE)' },
        { value: 'GF', label: 'แผนกบริการสถานี (GF)' }
    ];
    
    const HDQ_BH_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'HM-S', label: 'ส่วนงานเงินเดือนและค่าตอบแทน (HM-S)' },
        { value: 'HM-E', label: 'ส่วนงานแรงงานสัมพันธ์ (HM-E)' },
        { value: 'HM-I', label: 'ส่วนงานสารสนเทศทรัพยากรบุคคล (HM-I)' },
        { value: 'HO-R', label: 'ส่วนงานสรรหาและว่าจ้าง (HO-R)' },
        { value: 'HO-E', label: 'ส่วนงานประสานงานด้านการศึกษา (HO-E)' },
        { value: 'HO-B', label: 'ส่วนงานสนับสนุนและประสานงานสถานีกรุงเทพ (HO-B)' },
        { value: 'HW-G', label: 'ส่วนงานสวัสดิการทั่วไป (HW-G)' },
        { value: 'HW-U', label: 'ส่วนงานเครื่องแบบพนักงาน (HW-U)' },
        { value: 'HW-E', label: 'ส่วนงานบริการพนักงาน (HW-E)' },
        { value: 'HD-S', label: 'ส่วนงานวางแผนกลยุทธ์ทรัพยากรบุคคล (HD-S)' },
        { value: 'HD-D', label: 'ส่วนงานพัฒนาองค์กร (HD-D)' }
    ];
    
    const HDQ_BF_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'FA-R', label: 'ส่วนงานบัญชีลูกหนี้ (FA-R)' },
        { value: 'FA-P', label: 'ส่วนงานบัญชีเจ้าหนี้ (FA-P)' }
    ];
    
    const HDQ_BG_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'GS-T1', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 1' },
        { value: 'GS-T2', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 2' },
        { value: 'GS-T3', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 3' },
        { value: 'GS-T4', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 4' },
        { value: 'GS-T5', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 5' },
        { value: 'GS-T6', label: 'ส่วนงานสนับสนุนปฏิบัติการภาคพื้น ทีม 6' }
    ];

    const HDQ_BS_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'ST-C', label: 'ส่วนงานมาตรฐานการรักษาความปลอดภัยการบิน (ST-C)' },
        { value: 'ST-D', label: 'ส่วนงานควบคุมเอกสารและงานธุรการ (ST-D)' },
        { value: 'ST-F', label: 'ส่วนงานนิรภัยการบิน (ST-F)' },
        { value: 'ST-H', label: 'ส่วนงานอาชีวอนามัยและความปลอดภัย (ST-H)' },
        { value: 'ST-Q', label: 'ส่วนงานประกันคุณภาพ (ST-Q)' }
    ];

    const HDQ_BE_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'EA', label: 'แผนกเลขานุการผู้บริหาร (EA)' }
    ];

    const HDQ_BR_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'RC', label: 'แผนกสื่อสารองค์กร (RC)' },
        { value: 'RB', label: 'แผนกพัฒนาธุรกิจ (RB)' }
    ];

    const HDQ_BD_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'DP', label: 'แผนกจัดซื้อ (DP)' }
    ];

    const HDQ_BI_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'IM', label: 'แผนกเทคโนโลยีสารสนเทศ (IM)' }
    ];

    const HDQ_BL_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'LM', label: 'แผนกกฎหมาย (LM)' }
    ];

    const OTHER_STATION_BG_SECTIONS = [
        { value: '', label: 'เลือกแผนก', placeholder: true, disabled: true },
        { value: '-', label: '-' },
        { value: 'GF', label: 'แผนกบริการสถานี (GF)' }
    ];

    // ========================================
    // Shared Choices.js Config
    // ========================================
    
    const CHOICES_CONFIG = {
        searchEnabled: true,
        searchPlaceholderValue: 'พิมพ์เพื่อค้นหา...',
        noResultsText: 'ไม่พบผลลัพธ์',
        noChoicesText: 'ไม่มีตัวเลือก',
        itemSelectText: '',
        shouldSort: false,
        searchFloor: 1,
        searchResultLimit: 100
    };

    // ========================================
    // Core Logic Functions
    // ========================================
    
    /**
     * Get departments based on selected station
     */
    function getDepartments(station) {
        return station === 'สำนักงานใหญ่ (HDQ)' ? HDQ_DEPARTMENTS : STATION_DEPARTMENTS;
    }

    /**
     * Get sections based on selected station + department
     */
    function getSections(station, department) {
        if (station === 'สถานีสุวรรณภูมิ (BKK)' && department === 'BG') return BKK_BG_SECTIONS;
        if (station === 'สำนักงานใหญ่ (HDQ)') {
            switch (department) {
                case 'BH': return HDQ_BH_SECTIONS;
                case 'BF': return HDQ_BF_SECTIONS;
                case 'BG': return HDQ_BG_SECTIONS;
                case 'BS': return HDQ_BS_SECTIONS;
                case 'BE': return HDQ_BE_SECTIONS;
                case 'BR': return HDQ_BR_SECTIONS;
                case 'BD': return HDQ_BD_SECTIONS;
                case 'BI': return HDQ_BI_SECTIONS;
                case 'BL': return HDQ_BL_SECTIONS;
            }
        }
        // Other stations + BG
        if (station && station !== 'สำนักงานใหญ่ (HDQ)' && station !== 'สถานีสุวรรณภูมิ (BKK)' && department === 'BG') {
            return OTHER_STATION_BG_SECTIONS;
        }
        return DEFAULT_SECTIONS;
    }

    /**
     * Create a dropdown group handler (station -> department -> section cascade)
     */
    function createDropdownGroup(stationId, departmentId, sectionId) {
        let stationChoices, departmentChoices, sectionChoices;

        function updateDept() {
            const station = document.getElementById(stationId).value;
            const departments = getDepartments(station);
            if (departmentChoices) {
                departmentChoices.clearStore();
                departmentChoices.setChoices(departments, 'value', 'label', true);
            }
            updateSec();
        }

        function updateSec() {
            const station = document.getElementById(stationId).value;
            const department = document.getElementById(departmentId).value;
            const sections = getSections(station, department);
            if (sectionChoices) {
                sectionChoices.clearStore();
                sectionChoices.setChoices(sections, 'value', 'label', true);
            }
        }

        // Initialize Choices.js
        function initChoices() {
            if (document.getElementById(stationId)) {
                stationChoices = new Choices('#' + stationId, CHOICES_CONFIG);
                document.getElementById(stationId).addEventListener('change', updateDept);
            }
            if (document.getElementById(departmentId)) {
                departmentChoices = new Choices('#' + departmentId, CHOICES_CONFIG);
                document.getElementById(departmentId).addEventListener('change', updateSec);
            }
            if (document.getElementById(sectionId)) {
                sectionChoices = new Choices('#' + sectionId, CHOICES_CONFIG);
            }
        }

        return { initChoices, updateDept, updateSec };
    }

    // ========================================
    // UI Functions
    // ========================================

    /**
     * Toggle identity fields visibility
     */
    function toggleIdentityFields() {
        const toggle = document.getElementById('identityToggle');
        const fields = document.getElementById('identityFields');
        const divider = document.getElementById('identityDivider');
        const label = document.getElementById('identityLabel');
        
        if (toggle.checked) {
            label.textContent = 'ระบุตัวตน';
            label.className = 'text-sm text-blue-600 font-medium';
            
            fields.style.maxHeight = fields.scrollHeight + 'px';
            fields.style.opacity = '1';
            fields.style.marginTop = '0';
            divider.style.opacity = '1';
            divider.style.maxHeight = '1px';
            divider.style.marginBottom = '16px';
            setTimeout(() => { fields.style.maxHeight = 'none'; }, 300);
        } else {
            label.textContent = 'ไม่ระบุตัวตน';
            label.className = 'text-sm text-gray-600';
            
            fields.style.maxHeight = fields.scrollHeight + 'px';
            divider.style.opacity = '0';
            divider.style.maxHeight = '0';
            divider.style.marginBottom = '0';
            setTimeout(() => {
                fields.style.maxHeight = '0';
                fields.style.opacity = '0';
                fields.style.marginTop = '-16px';
            }, 10);
        }
    }

    /**
     * Category pill selection
     */
    function selectCategory(btn, value) {
        const activeClasses = ['bg-blue-500', 'text-white', 'border-blue-500'];
        const inactiveClasses = ['bg-white', 'text-gray-600', 'border-gray-200'];
        
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove(...activeClasses);
            pill.classList.add(...inactiveClasses);
        });
        btn.classList.remove(...inactiveClasses);
        btn.classList.add(...activeClasses);
        document.getElementById('selectedCategory').value = value;
        
        const otherContainer = document.getElementById('otherCategoryContainer');
        const otherInput = document.getElementById('otherCategoryInput');
        if (value === 'other') {
            otherContainer.classList.remove('hidden');
            otherInput.focus();
        } else {
            otherContainer.classList.add('hidden');
            otherInput.value = '';
        }
    }

    /**
     * Add file upload item
     */
    function addFileItem() {
        const container = document.getElementById('fileListContainer');
        const newItem = document.createElement('div');
        newItem.className = 'file-item p-4 bg-gray-50 rounded-3xl border border-gray-200';
        newItem.innerHTML = `
            <div class="flex items-center gap-3 mb-3">
                <input type="text" placeholder="กรุณาตั้งชื่อไฟล์" 
                    class="flex-1 px-4 py-2 rounded-3xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm">
                <button type="button" onclick="this.closest('.file-item').remove()" 
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="flex items-center gap-3">
                <label class="px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors whitespace-nowrap">
                    เลือกไฟล์
                    <input type="file" accept="image/*,.pdf,.doc,.docx" class="hidden" onchange="VFCForm.updateFileName(this)">
                </label>
                <span class="file-name text-sm text-gray-400">ยังไม่ได้เลือกไฟล์</span>
            </div>
        `;
        container.appendChild(newItem);
    }

    /**
     * Update file name display
     */
    function updateFileName(input) {
        const fileName = input.files[0] ? input.files[0].name : 'ยังไม่ได้เลือกไฟล์';
        input.closest('.file-item').querySelector('.file-name').textContent = fileName;
    }

    // ========================================
    // Initialization
    // ========================================
    
    /**
     * Initialize VFC Form
     * @param {Object} options
     * @param {string} options.detailPrefix - 'complaint' | 'compliment' | 'suggestion'
     */
    function init(options = {}) {
        const prefix = options.detailPrefix || 'suggestion';

        document.addEventListener('DOMContentLoaded', function() {
            // Personal Info dropdown group
            const personalGroup = createDropdownGroup('stationSelect', 'departmentSelect', 'sectionSelect');
            personalGroup.initChoices();

            // Make personal group functions accessible for inline onchange
            window.updateDepartmentOptions = personalGroup.updateDept;
            window.updateSectionOptions = personalGroup.updateSec;

            // Detail section dropdown group (complaint/compliment/suggestion)
            const detailStationId = prefix + 'StationSelect';
            const detailDeptId = prefix + 'DepartmentSelect';
            const detailSectionId = prefix + 'SectionSelect';

            if (document.getElementById(detailStationId)) {
                const detailGroup = createDropdownGroup(detailStationId, detailDeptId, detailSectionId);
                detailGroup.initChoices();

                // Make detail group functions accessible  
                const capPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
                window['update' + capPrefix + 'DepartmentOptions'] = detailGroup.updateDept;
                window['update' + capPrefix + 'SectionOptions'] = detailGroup.updateSec;
            }

            // Initialize identity fields transitions
            const fields = document.getElementById('identityFields');
            const divider = document.getElementById('identityDivider');
            if (fields) {
                fields.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease';
                fields.style.overflow = 'hidden';
            }
            if (divider) {
                divider.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin-bottom 0.3s ease';
            }
        });
    }

    // ========================================
    // Public API
    // ========================================
    
    return {
        init,
        toggleIdentityFields,
        selectCategory,
        addFileItem,
        updateFileName
    };

})();

// Expose functions globally for inline event handlers
window.toggleIdentityFields = VFCForm.toggleIdentityFields;
window.selectCategory = VFCForm.selectCategory;
window.addFileItem = VFCForm.addFileItem;
window.updateFileName = VFCForm.updateFileName;
