(function () {
  var tabs = document.querySelectorAll('.signup-toggle .toggle-item');
  var field = document.getElementById('account-type-field');
  var visual = document.getElementById('signup-visual-card');
  var faceCreator = document.querySelector('.signup-flip-face--creator');
  var faceBrand = document.querySelector('.signup-flip-face--brand');
  var signupForm = document.getElementById('signup-form-panel');
  var passwordField = document.getElementById('password-field');
  var passwordConfirmField = document.getElementById('password-confirm-field');
  var otpModal = document.getElementById('otp-modal');
  var otpCloseBtn = document.getElementById('otp-close-btn');
  var otpForm = document.getElementById('otp-form');
  var otpInput = document.getElementById('otp-input');
  var otpFeedback = document.getElementById('otp-feedback');
  var otpResendBtn = document.getElementById('otp-resend-btn');
  var brandDetailsModal = document.getElementById('brand-details-modal');
  var brandDetailsCloseBtn = document.getElementById('brand-details-close-btn');
  var brandDetailsForm = document.getElementById('brand-details-form');
  var brandDetailsTitle = document.getElementById('brand-details-title');
  var brandCompanyModal = document.getElementById('brand-company-modal');
  var brandCompanyCloseBtn = document.getElementById('brand-company-close-btn');
  var brandCompanyForm = document.getElementById('brand-company-form');
  var brandCompanyStep = document.getElementById('brand-company-step');
  var brandCompanyNextBtn = document.getElementById('brand-company-next-btn');
  var brandCompanyBackBtn = document.getElementById('brand-company-back-btn');
  var brandCompanySubmitBtn = document.getElementById('brand-company-submit-btn');
  var brandCompanyLogoInput = document.getElementById('brand-company-logo');
  var brandCompanyLogoPreview = document.getElementById('brand-company-logo-preview');
  var brandCompanyLogoDataUrl = document.getElementById('brand-company-logo-dataurl');
  var brandDropzone = document.getElementById('brand-dropzone');
  var brandUploadClearBtn = document.getElementById('brand-upload-clear-btn');
  var brandLogoUrlInput = document.getElementById('brand-logo-url');
  var brandLogoUrlBtn = document.getElementById('brand-logo-url-btn');
  var brandIndustrySelect = document.getElementById('brand-industry');
  var brandCategorySelect = document.getElementById('brand-category');
  var welcomeAccessModal = document.getElementById('welcome-access-modal');
  var welcomeAccessCloseBtn = document.getElementById('welcome-access-close-btn');
  var welcomeAccessDismissBtn = document.getElementById('welcome-access-dismiss-btn');
  var signupSnackbarStack = document.getElementById('signup-snackbar-stack');
  var brandPhoneField = brandDetailsForm ? brandDetailsForm.querySelector('[name="brand_phone"]') : null;
  var brandCountryField = brandDetailsForm ? brandDetailsForm.querySelector('[name="brand_country"]') : null;
  var brandCountryCodeField = document.getElementById('brand-country-code');
  var brandCountryCodeDisplay = document.getElementById('brand-country-code-display');
  var brandCodeSelect = document.getElementById('brand-code-select');
  var brandCodeToggle = document.getElementById('brand-code-toggle');
  var brandCountryCodeDropdown = document.getElementById('brand-country-code-dropdown');
  var brandCountryCodeSearch = document.getElementById('brand-country-code-search');
  var brandCountryCodeResults = document.getElementById('brand-country-code-results');
  var passwordToggleButtons = document.querySelectorAll('[data-password-toggle]');
  var countryCodeByName = {};
  var countryNameByCode = {};
  var countryRows = [];
  var filteredCodeRows = [];
  var codeSearchTimer = null;
  var lastValidCountryCode = '';
  var lastValidCountryDisplay = '';
  var isSnackbarStackExpanded = false;
  var MAX_SNACKBARS = 3;
  var SNACKBAR_EXIT_MS = 320;
  var SNACKBAR_OVERFLOW_EXIT_MS = 380;

  function updateSnackbarStackState() {
    if (!signupSnackbarStack) return;
    var snackbars = signupSnackbarStack.querySelectorAll('.signup-snackbar');
    snackbars.forEach(function (snackbar, index) {
      snackbar.classList.remove(
        'stack-top',
        'stack-second',
        'stack-third',
        'stack-hidden',
        'stack-expanded'
      );
      if (isSnackbarStackExpanded) {
        snackbar.classList.add('stack-expanded');
        return;
      }
      if (index === 0) {
        snackbar.classList.add('stack-top');
      } else if (index === 1) {
        snackbar.classList.add('stack-second');
      } else if (index === 2) {
        snackbar.classList.add('stack-third');
      } else {
        snackbar.classList.add('stack-hidden');
      }
    });
  }

  function setMode(isBrand) {
    if (visual) {
      visual.classList.toggle('signup-card-wrap--brand', isBrand);
      visual.setAttribute('data-mode', isBrand ? 'brand' : 'creator');
    }
    if (faceCreator) {
      if (isBrand) faceCreator.setAttribute('aria-hidden', 'true');
      else faceCreator.removeAttribute('aria-hidden');
    }
    if (faceBrand) {
      if (isBrand) faceBrand.removeAttribute('aria-hidden');
      else faceBrand.setAttribute('aria-hidden', 'true');
    }

    var activeMode = isBrand ? 'brand' : 'creator';
    var accountScopedNodes = document.querySelectorAll('[data-account]');
    accountScopedNodes.forEach(function (node) {
      var forAccount = node.getAttribute('data-account');
      var isActive = forAccount === activeMode;
      node.style.display = isActive ? '' : 'none';
      node.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      var scopedControls = node.querySelectorAll('input, select, textarea');
      scopedControls.forEach(function (control) {
        if (!control) return;
        if (isActive) control.setAttribute('required', '');
        else control.removeAttribute('required');
        setFieldErrorState(control, false);
      });
    });
  }

  function showSignupSnackbar(options) {
    if (!signupSnackbarStack) return;
    var data = options || {};
    var type = data.type || 'info';
    var message = data.message || 'Message';
    var actionLabel = data.actionLabel || 'Action';
    var duration = typeof data.duration === 'number' ? data.duration : 4200;
    var onAction = typeof data.onAction === 'function' ? data.onAction : null;

    var snackbar = document.createElement('article');
    snackbar.className = 'signup-snackbar signup-snackbar--' + type;
    snackbar.classList.add('is-new');
    snackbar.setAttribute('role', 'status');

    var icon = document.createElement('span');
    icon.className = 'signup-snackbar-icon';
    icon.setAttribute('aria-hidden', 'true');

    var text = document.createElement('p');
    text.className = 'signup-snackbar-text';
    text.textContent = message;

    var actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.className = 'signup-snackbar-action';
    actionButton.textContent = actionLabel;

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'signup-snackbar-close';
    closeButton.setAttribute('aria-label', 'Dismiss message');
    closeButton.textContent = '×';

    var removed = false;
    function removeSnackbar(mode) {
      if (removed) return;
      removed = true;
      snackbar.classList.remove('is-visible');
      snackbar.classList.add(mode === 'overflow' ? 'is-overflow-exit' : 'is-exit');
      setTimeout(function () {
        if (snackbar.parentNode) {
          snackbar.parentNode.removeChild(snackbar);
          updateSnackbarStackState();
        }
      }, mode === 'overflow' ? SNACKBAR_OVERFLOW_EXIT_MS : SNACKBAR_EXIT_MS);
    }

    actionButton.addEventListener('click', function () {
      if (onAction) onAction();
      removeSnackbar();
    });
    closeButton.addEventListener('click', removeSnackbar);

    snackbar.appendChild(icon);
    snackbar.appendChild(text);
    snackbar.appendChild(actionButton);
    snackbar.appendChild(closeButton);
    signupSnackbarStack.prepend(snackbar);
    updateSnackbarStackState();
    requestAnimationFrame(function () {
      snackbar.classList.add('is-visible');
      snackbar.classList.remove('is-new');
      updateSnackbarStackState();
    });

    var activeSnackbars = signupSnackbarStack.querySelectorAll('.signup-snackbar:not(.is-exit):not(.is-overflow-exit)');
    if (activeSnackbars.length > MAX_SNACKBARS) {
      var oldest = activeSnackbars[activeSnackbars.length - 1];
      if (oldest && typeof oldest._removeSnackbar === 'function') {
        oldest._removeSnackbar('overflow');
      }
    }

    snackbar._removeSnackbar = removeSnackbar;
    setTimeout(removeSnackbar, duration);
  }

  function setFieldErrorState(field, isInvalid) {
    if (!field) return;
    field.classList.toggle('is-field-error', !!isInvalid);
    if (field.type === 'checkbox') {
      var termsRow = field.closest('.signup-terms');
      if (termsRow) termsRow.classList.toggle('has-error', !!isInvalid);
    }
  }

  function validateFormFields(form) {
    if (!form) return;
    var controls = form.querySelectorAll('input, select, textarea');
    var firstInvalid = null;
    var invalidFields = [];
    controls.forEach(function (control) {
      if (!control || control.disabled) return;
      var type = (control.type || '').toLowerCase();
      if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') return;
      var isInvalid = !control.checkValidity();
      setFieldErrorState(control, isInvalid);
      if (isInvalid) {
        invalidFields.push(control);
        if (!firstInvalid) firstInvalid = control;
      }
    });
    return {
      isValid: !firstInvalid,
      firstInvalid: firstInvalid,
      invalidFields: invalidFields
    };
  }

  function getFieldLabel(field) {
    if (!field) return 'This field';
    if (field.type === 'checkbox' && field.name === 'terms') return 'Terms and Privacy Policy';
    var label = field.closest('label');
    if (label) {
      var titleNode = label.querySelector('span');
      if (titleNode && titleNode.textContent) return titleNode.textContent.trim();
      var text = label.textContent.replace(/\s+/g, ' ').trim();
      if (text) return text;
    }
    if (field.placeholder) return field.placeholder.trim();
    if (field.name) return field.name.replace(/_/g, ' ').trim();
    return 'This field';
  }

  function getSingleFieldErrorMessage(field) {
    if (!field) return 'Please check the required field.';
    var label = getFieldLabel(field);
    var validity = field.validity || {};
    if (validity.valueMissing) {
      if (field.type === 'checkbox') return 'Please accept ' + label + '.';
      return label + ' is required.';
    }
    if (validity.typeMismatch && field.type === 'email') {
      return 'Please enter a valid email address.';
    }
    if (validity.tooShort && field.minLength > 0) {
      return label + ' must be at least ' + field.minLength + ' characters.';
    }
    if (validity.patternMismatch) {
      return 'Please enter a valid ' + label.toLowerCase() + '.';
    }
    if (validity.customError && field.validationMessage) {
      return field.validationMessage;
    }
    if (field.validationMessage) return field.validationMessage;
    return 'Please check ' + label + '.';
  }

  function getValidationSnackbarMessage(validation, fallbackMultiMessage) {
    var invalidFields = validation && validation.invalidFields ? validation.invalidFields : [];
    if (invalidFields.length === 1) {
      return getSingleFieldErrorMessage(invalidFields[0]);
    }
    if (invalidFields.length > 1) {
      return invalidFields.length + ' fields need attention.';
    }
    return fallbackMultiMessage || 'Please check the form fields.';
  }

  function getValidationSeverity(validation) {
    var invalidFields = validation && validation.invalidFields ? validation.invalidFields : [];
    if (!invalidFields.length) return 'info';
    var hasStrictError = invalidFields.some(function (field) {
      if (!field || !field.validity) return false;
      var v = field.validity;
      return !!(v.customError || v.typeMismatch || v.patternMismatch || v.tooShort || v.tooLong || v.rangeOverflow || v.rangeUnderflow || v.stepMismatch || v.badInput);
    });
    return hasStrictError ? 'error' : 'warning';
  }

  function getValidationSnackbarState(validation, fallbackMultiMessage) {
    return {
      type: getValidationSeverity(validation),
      message: getValidationSnackbarMessage(validation, fallbackMultiMessage)
    };
  }

  function bindLiveFieldValidation(form) {
    if (!form) return;
    var controls = form.querySelectorAll('input, select, textarea');
    controls.forEach(function (control) {
      if (!control || control.disabled) return;
      var type = (control.type || '').toLowerCase();
      if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') return;
      function updateState() {
        setFieldErrorState(control, !control.checkValidity());
      }
      control.addEventListener('input', updateState);
      control.addEventListener('change', updateState);
      control.addEventListener('blur', updateState);
    });
  }

  if (!tabs.length) return;
  tabs.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var isBrand = btn.id === 'tab-brand';
      if (field) field.value = isBrand ? 'brand' : 'creator';
      setMode(isBrand);
    });
  });

  if (field && field.value === 'brand') {
    setMode(true);
  } else if (field && field.value === 'creator') {
    setMode(false);
  }

  bindLiveFieldValidation(signupForm);
  bindLiveFieldValidation(brandDetailsForm);
  if (signupSnackbarStack) {
    signupSnackbarStack.addEventListener('mouseenter', function () {
      isSnackbarStackExpanded = true;
      signupSnackbarStack.classList.add('is-expanded');
      updateSnackbarStackState();
    });
    signupSnackbarStack.addEventListener('mouseleave', function () {
      isSnackbarStackExpanded = false;
      signupSnackbarStack.classList.remove('is-expanded');
      updateSnackbarStackState();
    });
  }

  function openOtpModal() {
    if (!otpModal) return;
    otpModal.classList.add('is-open');
    otpModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (otpInput) otpInput.focus();
  }

  function closeOtpModal(keepBodyLock) {
    if (!otpModal) return;
    otpModal.classList.remove('is-open');
    otpModal.setAttribute('aria-hidden', 'true');
    if (!keepBodyLock) {
      document.body.classList.remove('modal-open');
    }
    if (otpFeedback) otpFeedback.textContent = '';
  }

  function openBrandDetailsModal() {
    var isBrandAccount = field && field.value === 'brand';
    if (isBrandAccount) {
      openBrandCompanyModal();
      return;
    }
    if (!brandDetailsModal) return;
    if (brandDetailsTitle) {
      if (isBrandAccount) {
        brandDetailsTitle.textContent = 'Tell us about your brand';
      } else {
        var firstNameField = signupForm ? signupForm.querySelector('[name="given_name"]') : null;
        var lastNameField = signupForm ? signupForm.querySelector('[name="family_name"]') : null;
        var firstName = firstNameField && firstNameField.value ? firstNameField.value.trim() : '';
        var lastName = lastNameField && lastNameField.value ? lastNameField.value.trim() : '';
        var fullName = (firstName + ' ' + lastName).trim();
        var safeName = fullName || 'you';
        brandDetailsTitle.innerHTML = 'Tell us about you — <em class="text-gradient"></em>';
        var nameNode = brandDetailsTitle.querySelector('.text-gradient');
        if (nameNode) nameNode.textContent = safeName;
      }
    }

    brandDetailsModal.classList.add('is-open');
    brandDetailsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var firstField = brandDetailsForm ? brandDetailsForm.querySelector('input, select') : null;
    if (firstField) firstField.focus();
  }

  function closeBrandDetailsModal() {
    if (!brandDetailsModal) return;
    brandDetailsModal.classList.remove('is-open');
    brandDetailsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  var brandCompanyCurrentSlide = 1;
  var BRAND_COMPANY_SLIDES = 3;

  function getBrandCompanySlideNode(slideNum) {
    if (!brandCompanyForm) return null;
    return brandCompanyForm.querySelector('.brand-company-slide[data-slide="' + slideNum + '"]');
  }

  function setBrandCompanySlide(slideNum) {
    if (!brandCompanyForm) return;
    brandCompanyCurrentSlide = Math.max(1, Math.min(BRAND_COMPANY_SLIDES, slideNum));
    var slides = brandCompanyForm.querySelectorAll('.brand-company-slide');
    slides.forEach(function (node) {
      var n = parseInt(node.getAttribute('data-slide') || '0', 10);
      node.classList.toggle('is-active', n === brandCompanyCurrentSlide);
    });
    if (brandCompanyStep) {
      brandCompanyStep.textContent = 'Step ' + brandCompanyCurrentSlide + ' of ' + BRAND_COMPANY_SLIDES + ' · Brand details';
    }
    if (brandCompanyBackBtn) {
      brandCompanyBackBtn.style.display = brandCompanyCurrentSlide === 1 ? 'none' : '';
    }
    if (brandCompanyNextBtn && brandCompanySubmitBtn) {
      var isLast = brandCompanyCurrentSlide === BRAND_COMPANY_SLIDES;
      brandCompanyNextBtn.style.display = isLast ? 'none' : '';
      brandCompanySubmitBtn.style.display = isLast ? '' : 'none';
    }
  }

  function validateVisibleBrandCompanySlide() {
    var slideNode = getBrandCompanySlideNode(brandCompanyCurrentSlide);
    if (!slideNode) return { isValid: true, firstInvalid: null, invalidFields: [] };
    var controls = slideNode.querySelectorAll('input, select, textarea');
    var firstInvalid = null;
    var invalidFields = [];
    controls.forEach(function (control) {
      if (!control || control.disabled) return;
      var type = (control.type || '').toLowerCase();
      if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') return;
      var isInvalid = !control.checkValidity();
      setFieldErrorState(control, isInvalid);
      if (isInvalid) {
        invalidFields.push(control);
        if (!firstInvalid) firstInvalid = control;
      }
    });
    return { isValid: !firstInvalid, firstInvalid: firstInvalid, invalidFields: invalidFields };
  }

  function openBrandCompanyModal() {
    if (!brandCompanyModal) return;
    setBrandCompanySlide(1);
    brandCompanyModal.classList.add('is-open');
    brandCompanyModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var firstField = brandCompanyForm ? brandCompanyForm.querySelector('.brand-company-slide.is-active input, .brand-company-slide.is-active select, .brand-company-slide.is-active textarea') : null;
    if (firstField) firstField.focus();
  }

  function closeBrandCompanyModal() {
    if (!brandCompanyModal) return;
    brandCompanyModal.classList.remove('is-open');
    brandCompanyModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function wireBrandIndustryCategory() {
    if (!brandIndustrySelect || !brandCategorySelect) return;
    var categoryByIndustry = {
      'Fashion & Beauty': ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Fashion', 'Accessories', 'Other'],
      'Food & Beverage': ['Restaurants', 'Cafe', 'Delivery', 'CPG', 'Beverages', 'Other'],
      'Tech & Apps': ['Mobile App', 'SaaS', 'Consumer Tech', 'Electronics', 'Other'],
      'Travel & Hospitality': ['Hotel', 'Airline', 'Tourism', 'Experiences', 'Other'],
      'Health & Fitness': ['Gym', 'Supplements', 'Wellness', 'Clinics', 'Other'],
      Automotive: ['Cars', 'Accessories', 'Services', 'Other'],
      'Real Estate': ['Developer', 'Brokerage', 'Property Portal', 'Other'],
      Other: ['Other']
    };
    function setCategoryOptions(industry) {
      var categories = categoryByIndustry[industry] || [];
      brandCategorySelect.innerHTML = '';
      if (!industry) {
        brandCategorySelect.disabled = true;
        var opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Select industry first';
        opt.disabled = true;
        opt.selected = true;
        brandCategorySelect.appendChild(opt);
        return;
      }
      brandCategorySelect.disabled = false;
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select category';
      placeholder.disabled = true;
      placeholder.selected = true;
      brandCategorySelect.appendChild(placeholder);
      categories.forEach(function (c) {
        var o = document.createElement('option');
        o.value = c;
        o.textContent = c;
        brandCategorySelect.appendChild(o);
      });
    }
    brandIndustrySelect.addEventListener('change', function () {
      setCategoryOptions(brandIndustrySelect.value);
    });
    setCategoryOptions(brandIndustrySelect.value);
  }

  function wireBrandLogoUpload() {
    if (!brandCompanyLogoInput || !brandCompanyLogoPreview) return;

    function clearLogo() {
      brandCompanyLogoInput.value = '';
      if (brandCompanyLogoDataUrl) brandCompanyLogoDataUrl.value = '';
      brandCompanyLogoPreview.src = '';
      if (brandDropzone) brandDropzone.classList.remove('has-preview');
      setFieldErrorState(brandCompanyLogoInput, true);
    }

    function applyLogoDataUrl(dataUrl) {
      if (!dataUrl) return;
      if (brandCompanyLogoDataUrl) brandCompanyLogoDataUrl.value = dataUrl;
      brandCompanyLogoPreview.src = dataUrl;
      if (brandDropzone) brandDropzone.classList.add('has-preview');
      setFieldErrorState(brandCompanyLogoInput, false);
    }

    function validateFile(file) {
      if (!file) return { ok: false, message: 'Please choose an image file.' };
      var isOkType = /image\/(png|jpeg)/.test(file.type || '');
      if (!isOkType) return { ok: false, message: 'Logo must be a PNG or JPG.' };
      var maxBytes = 5 * 1024 * 1024;
      if (file.size > maxBytes) return { ok: false, message: 'Logo must be 5 MB or smaller.' };
      return { ok: true };
    }

    function handleFile(file) {
      var v = validateFile(file);
      if (!v.ok) {
        showSignupSnackbar({ type: 'error', message: v.message, actionLabel: 'OK' });
        clearLogo();
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = typeof reader.result === 'string' ? reader.result : '';
        applyLogoDataUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }

    brandCompanyLogoInput.addEventListener('change', function () {
      var file = brandCompanyLogoInput.files && brandCompanyLogoInput.files[0] ? brandCompanyLogoInput.files[0] : null;
      if (!file) return;
      handleFile(file);
    });

    if (brandUploadClearBtn) {
      brandUploadClearBtn.addEventListener('click', function () {
        clearLogo();
      });
    }

    if (brandDropzone) {
      brandDropzone.addEventListener('dragenter', function (e) {
        e.preventDefault();
        brandDropzone.classList.add('is-drag');
      });
      brandDropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        brandDropzone.classList.add('is-drag');
      });
      brandDropzone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        brandDropzone.classList.remove('is-drag');
      });
      brandDropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        brandDropzone.classList.remove('is-drag');
        var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0] ? e.dataTransfer.files[0] : null;
        if (file) handleFile(file);
      });
    }

    if (brandLogoUrlBtn && brandLogoUrlInput) {
      brandLogoUrlBtn.addEventListener('click', function () {
        var url = (brandLogoUrlInput.value || '').trim();
        if (!url) {
          showSignupSnackbar({ type: 'warning', message: 'Please paste an image URL first.', actionLabel: 'OK' });
          return;
        }
        try {
          // validate URL format
          new URL(url);
        } catch (e) {
          showSignupSnackbar({ type: 'error', message: 'Please enter a valid URL.', actionLabel: 'OK' });
          return;
        }
        brandLogoUrlBtn.disabled = true;
        brandLogoUrlBtn.textContent = 'Uploading...';
        fetch(url)
          .then(function (res) {
            if (!res.ok) throw new Error('Fetch failed');
            return res.blob();
          })
          .then(function (blob) {
            var fileType = blob.type || '';
            var fakeFile = { type: fileType, size: blob.size };
            var v = validateFile(fakeFile);
            if (!v.ok) throw new Error(v.message);
            return new Promise(function (resolve) {
              var reader = new FileReader();
              reader.onload = function () {
                resolve(typeof reader.result === 'string' ? reader.result : '');
              };
              reader.readAsDataURL(blob);
            });
          })
          .then(function (dataUrl) {
            if (!dataUrl) throw new Error('Could not read image.');
            applyLogoDataUrl(dataUrl);
            showSignupSnackbar({ type: 'success', message: 'Image imported from URL.', actionLabel: 'OK' });
          })
          .catch(function (err) {
            showSignupSnackbar({ type: 'error', message: (err && err.message) || 'Could not import image.', actionLabel: 'OK' });
            clearLogo();
          })
          .finally(function () {
            brandLogoUrlBtn.disabled = false;
            brandLogoUrlBtn.textContent = 'Upload';
          });
      });
    }
  }

  function openWelcomeAccessModal() {
    if (!welcomeAccessModal) return;
    welcomeAccessModal.classList.add('is-open');
    welcomeAccessModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeWelcomeAccessModal() {
    if (!welcomeAccessModal) return;
    welcomeAccessModal.classList.remove('is-open');
    welcomeAccessModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function sanitizePhoneNumberInput(value) {
    var digitsOnly = (value || '').replace(/\D/g, '');
    return digitsOnly.replace(/^0+/, '');
  }

  function getNormalizedPassword(value) {
    return (value || '').trim();
  }

  function validatePasswordMatch() {
    if (!passwordField || !passwordConfirmField) return true;
    var passwordValue = getNormalizedPassword(passwordField.value);
    var confirmValue = getNormalizedPassword(passwordConfirmField.value);
    var isMatch = passwordValue === confirmValue;
    passwordConfirmField.setCustomValidity(isMatch ? '' : 'Passwords do not match');
    return isMatch;
  }

  function detectCountryCodeFromRegion() {
    var codeByRegion = {
      AE: '+971',
      IN: '+91',
      SA: '+966',
      QA: '+974',
      KW: '+965',
      BH: '+973',
      OM: '+968',
      US: '+1',
      CA: '+1',
      GB: '+44',
      PK: '+92',
      BD: '+880',
      NP: '+977',
      LK: '+94',
      AU: '+61',
      SG: '+65'
    };
    var locale = '';
    try {
      locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    } catch (err) {
      locale = '';
    }
    var regionFromLocale = locale.indexOf('-') > -1 ? locale.split('-').pop().toUpperCase() : '';
    if (regionFromLocale && codeByRegion[regionFromLocale]) return codeByRegion[regionFromLocale];

    var tz = '';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (err) {
      tz = '';
    }
    if (/Dubai|Abu_Dhabi|Muscat/.test(tz)) return '+971';
    if (/Kolkata|Calcutta/.test(tz)) return '+91';
    if (/Riyadh/.test(tz)) return '+966';
    if (/Doha/.test(tz)) return '+974';
    return '+971';
  }

  function detectCountryFromRegion() {
    var countryByRegion = {
      AE: 'United Arab Emirates',
      IN: 'India',
      SA: 'Saudi Arabia',
      QA: 'Qatar',
      KW: 'Kuwait',
      BH: 'Bahrain',
      OM: 'Oman'
    };
    var locale = '';
    try {
      locale = Intl.DateTimeFormat().resolvedOptions().locale || '';
    } catch (err) {
      locale = '';
    }
    var regionFromLocale = locale.indexOf('-') > -1 ? locale.split('-').pop().toUpperCase() : '';
    if (regionFromLocale && countryByRegion[regionFromLocale]) return countryByRegion[regionFromLocale];

    var tz = '';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (err) {
      tz = '';
    }
    if (/Kolkata|Calcutta/.test(tz)) return 'India';
    if (/Riyadh/.test(tz)) return 'Saudi Arabia';
    if (/Doha/.test(tz)) return 'Qatar';
    if (/Dubai|Abu_Dhabi/.test(tz)) return 'United Arab Emirates';
    return 'United Arab Emirates';
  }

  function getCodeFromCountry(country) {
    var codeByCountry = {
      India: '+91',
      'United Arab Emirates': '+971',
      'Saudi Arabia': '+966',
      Qatar: '+974',
      Kuwait: '+965',
      Bahrain: '+973',
      Oman: '+968',
      'United Kingdom': '+44',
      'United States': '+1',
      Canada: '+1'
    };
    return countryCodeByName[country] || codeByCountry[country] || '+971';
  }

  function getFlagEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '';
    var chars = countryCode.toUpperCase().split('');
    return String.fromCodePoint(chars[0].charCodeAt(0) + 127397) + String.fromCodePoint(chars[1].charCodeAt(0) + 127397);
  }

  function getDisplayCode(row) {
    var flag = getFlagEmoji(row.region);
    return flag ? flag + ' ' + row.code : row.code;
  }

  function getDisplayCountry(row) {
    var flag = getFlagEmoji(row.region);
    return flag ? flag + ' ' + row.country : row.country;
  }

  function setCountryFromCode(code) {
    if (!brandCountryField || !code) return;
    var mappedCountry = countryNameByCode[code];
    if (!mappedCountry) return;
    var hasOption = Array.prototype.some.call(brandCountryField.options, function (opt) {
      return opt.value === mappedCountry;
    });
    if (hasOption) {
      brandCountryField.value = mappedCountry;
    }
  }

  function openCodeDropdown() {
    if (!brandCodeSelect || !brandCountryCodeDropdown) return;
    var rect = brandCodeSelect.getBoundingClientRect();
    var spaceBelow = window.innerHeight - rect.bottom;
    var spaceAbove = rect.top;
    var openUp = spaceBelow < 180 && spaceAbove > spaceBelow;
    brandCodeSelect.classList.add('is-open');
    brandCodeSelect.classList.toggle('is-up', openUp);
    if (brandCountryCodeSearch) {
      brandCountryCodeSearch.value = '';
      setTimeout(function () {
        brandCountryCodeSearch.focus();
      }, 0);
    }
  }

  function closeCodeDropdown() {
    if (!brandCodeSelect) return;
    brandCodeSelect.classList.remove('is-open', 'is-up');
  }

  function renderCodeDropdown(rows) {
    if (!brandCountryCodeResults) return;
    if (!rows.length) {
      brandCountryCodeResults.innerHTML = '<div class="brand-code-option-empty">No matches found</div>';
      return;
    }
    brandCountryCodeResults.innerHTML = rows
      .slice(0, 80)
      .map(function (row, index) {
        return (
          '<button type="button" class="brand-code-option" data-index="' +
          index +
          '" data-code="' +
          row.code +
          '" data-country="' +
          row.country.replace(/"/g, '&quot;') +
          '">' +
          '<span class="brand-code-option-main">' +
          getDisplayCode(row) +
          '</span>' +
          '<span class="brand-code-option-country">' +
          row.country +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function applyCodeSelection(row) {
    if (!row || !brandCountryCodeDisplay || !brandCountryCodeField) return;
    brandCountryCodeField.value = row.code;
    brandCountryCodeDisplay.value = getDisplayCode(row);
    lastValidCountryCode = row.code;
    lastValidCountryDisplay = getDisplayCode(row);
    setCountryFromCode(row.code);
    closeCodeDropdown();
  }

  function filterCodeRows(query) {
    var q = (query || '').toLowerCase().trim();
    if (!q) return countryRows.slice();
    var qNoPlus = q.replace(/\+/g, '');
    return countryRows.filter(function (row) {
      var country = row.country.toLowerCase();
      var code = row.code.toLowerCase();
      var codeNoPlus = code.replace('+', '');
      return (
        country.indexOf(q) > -1 ||
        code.indexOf(q) > -1 ||
        codeNoPlus.indexOf(qNoPlus) > -1
      );
    });
  }

  function populateCountryFieldsFromApi() {
    if (!brandCountryField || !brandCountryCodeField) return;
    fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2')
      .then(function (response) {
        if (!response.ok) throw new Error('Country API failed');
        return response.json();
      })
      .then(function (countries) {
        countryRows = [];
        countries.forEach(function (item) {
          if (!item || !item.name || !item.name.common || !item.idd || !item.idd.root) return;
          var root = item.idd.root;
          var suffix = item.idd.suffixes && item.idd.suffixes.length ? item.idd.suffixes[0] : '';
          var dialingCode = '' + root + suffix;
          if (!/^\+\d+$/.test(dialingCode)) return;
          countryRows.push({
            country: item.name.common,
            code: dialingCode,
            region: item.cca2 || ''
          });
        });

        countryRows.sort(function (a, b) {
          return a.country.localeCompare(b.country);
        });

        countryCodeByName = {};
        countryNameByCode = {};
        brandCountryField.innerHTML = '';

        countryRows.forEach(function (row) {
          countryCodeByName[row.country] = row.code;
          if (!countryNameByCode[row.code]) {
            countryNameByCode[row.code] = row.country;
          }

          var countryOption = document.createElement('option');
          countryOption.value = row.country;
          countryOption.textContent = row.country;
          brandCountryField.appendChild(countryOption);
        });

        var detectedCountry = detectCountryFromRegion();
        var detectedCode = getCodeFromCountry(detectedCountry);

        if (countryCodeByName[detectedCountry]) {
          brandCountryField.value = detectedCountry;
          var preferred = countryRows.find(function (row) {
            return row.country === detectedCountry && row.code === detectedCode;
          });
          applyCodeSelection(preferred || countryRows[0]);
        } else if (countryRows.length) {
          brandCountryField.value = countryRows[0].country;
          applyCodeSelection(countryRows[0]);
        }
        if (brandCountryCodeField.value) {
          lastValidCountryCode = brandCountryCodeField.value;
          var initialRow = countryRows.find(function (row) {
            return row.code === lastValidCountryCode && row.country === brandCountryField.value;
          }) || countryRows.find(function (row) {
            return row.code === lastValidCountryCode;
          });
          if (initialRow) {
            lastValidCountryDisplay = getDisplayCode(initialRow);
            brandCountryCodeDisplay.value = lastValidCountryDisplay;
          }
        }
        filteredCodeRows = countryRows.slice();
        renderCodeDropdown(filteredCodeRows);
      })
      .catch(function () {
        // API-only requirement: leave placeholders if fetch fails.
      });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      validatePasswordMatch();
      var signupValidation = validateFormFields(signupForm);
      if (!signupValidation.isValid) {
        var signupSnack = getValidationSnackbarState(signupValidation, 'Please fill all required fields before continuing.');
        showSignupSnackbar({
          type: signupSnack.type,
          message: signupSnack.message,
          actionLabel: 'Fix',
          onAction: function () {
            if (signupValidation.firstInvalid && typeof signupValidation.firstInvalid.focus === 'function') {
              signupValidation.firstInvalid.focus();
            }
          }
        });
        if (signupValidation.firstInvalid && typeof signupValidation.firstInvalid.focus === 'function') {
          signupValidation.firstInvalid.focus();
        }
        return;
      }
      showSignupSnackbar({
        type: 'success',
        message: 'Signup details accepted. Enter OTP to continue.',
        actionLabel: 'Continue',
        onAction: function () {
          if (otpInput) otpInput.focus();
        }
      });
      openOtpModal();
    });
  }

  if (passwordField && passwordConfirmField) {
    passwordField.addEventListener('input', function () {
      validatePasswordMatch();
      setFieldErrorState(passwordConfirmField, !passwordConfirmField.checkValidity());
    });
    passwordConfirmField.addEventListener('input', function () {
      validatePasswordMatch();
      setFieldErrorState(passwordConfirmField, !passwordConfirmField.checkValidity());
    });
  }

  if (otpModal) {
    otpModal.addEventListener('click', function (event) {
      if (event.target && event.target.getAttribute('data-otp-close') === 'true') {
        event.preventDefault();
      }
    });
  }

  if (otpCloseBtn) {
    otpCloseBtn.addEventListener('click', closeOtpModal);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && otpModal && otpModal.classList.contains('is-open')) {
      event.preventDefault();
    }
    if (event.key === 'Escape' && welcomeAccessModal && welcomeAccessModal.classList.contains('is-open')) {
      event.preventDefault();
      closeWelcomeAccessModal();
    }
  });

  if (otpInput) {
    otpInput.addEventListener('input', function () {
      otpInput.value = otpInput.value.replace(/\D/g, '').slice(0, 6);
    });
  }

  if (otpForm) {
    otpForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!otpInput || !otpFeedback) return;
      if (otpInput.value.length !== 6) {
        showSignupSnackbar({
          type: 'error',
          message: 'Please enter the 6-digit OTP code.',
          actionLabel: 'Retry',
          onAction: function () {
            otpInput.focus();
          }
        });
        otpFeedback.textContent = 'Please enter the 6-digit OTP.';
        otpFeedback.classList.remove('otp-feedback--ok');
        otpFeedback.classList.add('otp-feedback--error');
        otpInput.focus();
        return;
      }
      otpFeedback.textContent = 'OTP verified successfully.';
      otpFeedback.classList.remove('otp-feedback--error');
      otpFeedback.classList.add('otp-feedback--ok');
      showSignupSnackbar({
        type: 'success',
        message: 'OTP verified successfully.',
        actionLabel: 'Done'
      });
      setTimeout(function () {
        closeOtpModal(true);
        openBrandDetailsModal();
      }, 800);
    });
  }

  if (otpResendBtn && otpFeedback) {
    otpResendBtn.addEventListener('click', function () {
      if (otpInput) {
        otpInput.value = '';
        otpInput.focus();
      }
      otpFeedback.textContent = 'A new OTP has been sent.';
      otpFeedback.classList.remove('otp-feedback--error');
      otpFeedback.classList.add('otp-feedback--ok');
      showSignupSnackbar({
        type: 'info',
        message: 'A new OTP has been sent to your email.',
        actionLabel: 'OK'
      });
    });
  }

  if (passwordToggleButtons.length) {
    passwordToggleButtons.forEach(function (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var inputId = toggleBtn.getAttribute('data-password-toggle');
        var targetField = inputId ? document.getElementById(inputId) : null;
        if (!targetField) return;
        var showPassword = targetField.type === 'password';
        targetField.type = showPassword ? 'text' : 'password';
        toggleBtn.setAttribute('aria-pressed', showPassword ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
        toggleBtn.classList.toggle('is-visible', showPassword);
      });
    });
  }

  if (brandDetailsCloseBtn) {
    brandDetailsCloseBtn.addEventListener('click', closeBrandDetailsModal);
  }

  if (brandCompanyCloseBtn) {
    brandCompanyCloseBtn.addEventListener('click', closeBrandCompanyModal);
  }

  if (brandCompanyModal) {
    brandCompanyModal.addEventListener('click', function (event) {
      if (event.target && event.target.getAttribute('data-brand-company-close') === 'true') {
        closeBrandCompanyModal();
      }
    });
  }

  if (welcomeAccessCloseBtn) {
    welcomeAccessCloseBtn.addEventListener('click', closeWelcomeAccessModal);
  }

  if (welcomeAccessDismissBtn) {
    welcomeAccessDismissBtn.addEventListener('click', closeWelcomeAccessModal);
  }

  if (welcomeAccessModal) {
    welcomeAccessModal.addEventListener('click', function (event) {
      if (event.target && event.target.getAttribute('data-welcome-close') === 'true') {
        closeWelcomeAccessModal();
      }
    });
  }

  if (brandDetailsForm) {
    if (brandPhoneField) {
      brandPhoneField.addEventListener('input', function () {
        brandPhoneField.value = sanitizePhoneNumberInput(brandPhoneField.value);
      });
    }
    brandDetailsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (brandPhoneField) {
        brandPhoneField.value = sanitizePhoneNumberInput(brandPhoneField.value);
      }
      var brandValidation = validateFormFields(brandDetailsForm);
      if (!brandValidation.isValid) {
        var brandSnack = getValidationSnackbarState(brandValidation, 'Please complete all brand details.');
        showSignupSnackbar({
          type: brandSnack.type,
          message: brandSnack.message,
          actionLabel: 'Fix',
          onAction: function () {
            if (brandValidation.firstInvalid && typeof brandValidation.firstInvalid.focus === 'function') {
              brandValidation.firstInvalid.focus();
            }
          }
        });
        if (brandValidation.firstInvalid && typeof brandValidation.firstInvalid.focus === 'function') {
          brandValidation.firstInvalid.focus();
        }
        return;
      }
      closeBrandDetailsModal();
      openWelcomeAccessModal();
      var isBrandAccount = field && field.value === 'brand';
      showSignupSnackbar({
        type: 'success',
        message: isBrandAccount ? 'Brand profile submitted successfully.' : 'Profile submitted successfully.',
        actionLabel: 'Great'
      });
    });
  }

  if (brandCompanyForm) {
    bindLiveFieldValidation(brandCompanyForm);
    wireBrandIndustryCategory();
    wireBrandLogoUpload();
    setBrandCompanySlide(1);

    if (brandCompanyBackBtn) {
      brandCompanyBackBtn.addEventListener('click', function () {
        setBrandCompanySlide(brandCompanyCurrentSlide - 1);
      });
    }

    if (brandCompanyNextBtn) {
      brandCompanyNextBtn.addEventListener('click', function () {
        var v = validateVisibleBrandCompanySlide();
        if (!v.isValid) {
          var snack = getValidationSnackbarState(v, 'Please complete the required fields.');
          showSignupSnackbar({
            type: snack.type,
            message: snack.message,
            actionLabel: 'Fix',
            onAction: function () {
              if (v.firstInvalid && typeof v.firstInvalid.focus === 'function') v.firstInvalid.focus();
            }
          });
          if (v.firstInvalid && typeof v.firstInvalid.focus === 'function') v.firstInvalid.focus();
          return;
        }
        setBrandCompanySlide(brandCompanyCurrentSlide + 1);
      });
    }

    brandCompanyForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Validate whole brand company form before submit
      var brandCompanyValidation = validateFormFields(brandCompanyForm);
      if (!brandCompanyValidation.isValid) {
        var brandSnack = getValidationSnackbarState(brandCompanyValidation, 'Please complete all brand details.');
        showSignupSnackbar({
          type: brandSnack.type,
          message: brandSnack.message,
          actionLabel: 'Fix',
          onAction: function () {
            if (brandCompanyValidation.firstInvalid && typeof brandCompanyValidation.firstInvalid.focus === 'function') {
              brandCompanyValidation.firstInvalid.focus();
            }
          }
        });
        if (brandCompanyValidation.firstInvalid && typeof brandCompanyValidation.firstInvalid.focus === 'function') {
          brandCompanyValidation.firstInvalid.focus();
        }
        // If the invalid field is on slide 1, ensure slide 1 is visible
        var slide1 = getBrandCompanySlideNode(1);
        if (slide1 && slide1.contains(brandCompanyValidation.firstInvalid)) setBrandCompanySlide(1);
        var slide2 = getBrandCompanySlideNode(2);
        if (slide2 && slide2.contains(brandCompanyValidation.firstInvalid)) setBrandCompanySlide(2);
        return;
      }

      closeBrandCompanyModal();
      openWelcomeAccessModal();
      showSignupSnackbar({
        type: 'success',
        message: 'Brand profile submitted successfully.',
        actionLabel: 'Great'
      });
    });
  }

  if (brandCountryCodeField) {
    if (!brandCountryCodeField.value) brandCountryCodeField.value = detectCountryCodeFromRegion();
  }

  if (brandCountryField) {
    var detectedCountry = detectCountryFromRegion();
    var matchingOption = Array.prototype.find.call(brandCountryField.options, function (opt) {
      return opt.value === detectedCountry;
    });
    if (matchingOption) {
      brandCountryField.value = detectedCountry;
      if (brandCountryCodeField && brandCountryCodeDisplay) {
        brandCountryCodeField.value = getCodeFromCountry(detectedCountry);
        lastValidCountryCode = brandCountryCodeField.value;
        var detectedRow = countryRows.find(function (row) {
          return row.country === detectedCountry && row.code === brandCountryCodeField.value;
        });
        if (detectedRow) {
          lastValidCountryDisplay = getDisplayCode(detectedRow);
          brandCountryCodeDisplay.value = lastValidCountryDisplay;
        }
        lastValidCountryCode = brandCountryCodeField.value;
      }
    }
    brandCountryField.addEventListener('change', function () {
      if (!brandCountryCodeField || !brandCountryCodeDisplay) return;
      var selectedCode = getCodeFromCountry(brandCountryField.value);
      var rowMatch = countryRows.find(function (row) {
        return row.country === brandCountryField.value && row.code === selectedCode;
      });
      if (!rowMatch) {
        rowMatch = countryRows.find(function (row) {
          return row.country === brandCountryField.value;
        });
      }
      if (rowMatch) {
        applyCodeSelection(rowMatch);
      } else {
        brandCountryCodeField.value = selectedCode;
        brandCountryCodeDisplay.value = selectedCode;
        lastValidCountryCode = selectedCode;
        lastValidCountryDisplay = selectedCode;
      }
    });
  }

  if (brandCountryCodeDisplay && brandCountryCodeDropdown) {
    brandCountryCodeDisplay.addEventListener('click', function () {
      filteredCodeRows = filterCodeRows('');
      renderCodeDropdown(filteredCodeRows);
      openCodeDropdown();
    });

    brandCountryCodeDisplay.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        filteredCodeRows = filterCodeRows('');
        renderCodeDropdown(filteredCodeRows);
        openCodeDropdown();
      }
    });

    brandCountryCodeDropdown.addEventListener('click', function (event) {
      var option = event.target.closest('.brand-code-option');
      if (!option) return;
      var code = option.getAttribute('data-code');
      var country = option.getAttribute('data-country');
      var row = countryRows.find(function (item) {
        return item.code === code && item.country === country;
      });
      if (row) applyCodeSelection(row);
    });
  }

  if (brandCountryCodeSearch) {
    brandCountryCodeSearch.addEventListener('input', function () {
      if (codeSearchTimer) clearTimeout(codeSearchTimer);
      codeSearchTimer = setTimeout(function () {
        filteredCodeRows = filterCodeRows(brandCountryCodeSearch.value);
        renderCodeDropdown(filteredCodeRows);
      }, 180);
    });

    brandCountryCodeSearch.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (filteredCodeRows.length) applyCodeSelection(filteredCodeRows[0]);
      }
      if (event.key === 'Escape') closeCodeDropdown();
    });
  }

  if (brandCodeToggle && brandCountryCodeDisplay) {
    brandCodeToggle.addEventListener('click', function () {
      if (brandCodeSelect && brandCodeSelect.classList.contains('is-open')) {
        closeCodeDropdown();
        return;
      }
      filteredCodeRows = filterCodeRows('');
      renderCodeDropdown(filteredCodeRows);
      openCodeDropdown();
      brandCountryCodeDisplay.focus();
    });
  }

  document.addEventListener('click', function (event) {
    if (!brandCodeSelect) return;
    if (!brandCodeSelect.contains(event.target)) closeCodeDropdown();
  });

  populateCountryFieldsFromApi();
})();