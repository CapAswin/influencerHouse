(function () {
  var signupToggle = document.querySelector('.signup-toggle');
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
  var otpDigitsContainer = document.getElementById('otp-digits');
  var otpDigitInputs = otpDigitsContainer ? Array.prototype.slice.call(otpDigitsContainer.querySelectorAll('.otp-digit')) : [];
  var brandDetailsModal = document.getElementById('brand-details-modal');
  var brandDetailsCloseBtn = document.getElementById('brand-details-close-btn');
  var brandDetailsForm = document.getElementById('brand-details-form');
  var influencerFormScrollBtn = document.getElementById('influencer-form-scroll-btn');
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
  var brandCompanySizeField = brandCompanyForm ? brandCompanyForm.querySelector('[name="brand_company_size"]') : null;
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
  var brandNationalityCountryField = brandDetailsForm ? brandDetailsForm.querySelector('[name="brand_nationality_country"]') : null;
  var brandProvinceField = brandDetailsForm ? brandDetailsForm.querySelector('[name="brand_province"]') : null;
  var influencerCategoryField = document.getElementById('influencer-category');
  var influencerNicheField = document.getElementById('influencer-niche');
  var brandDetailsCard = brandDetailsModal ? brandDetailsModal.querySelector('.brand-details-card') : null;
  var influencerDocumentInput = document.getElementById('influencer-document-input');
  var influencerDocumentName = document.getElementById('influencer-document-name');
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
  var lastSignupPayload = null;
  var filteredCodeRows = [];
  var codeSearchTimer = null;
  var passwordFieldBlurred = false;
  var passwordConfirmFieldBlurred = false;
  var isSnackbarStackExpanded = false;
  var MAX_SNACKBARS = 3;
  var SNACKBAR_EXIT_MS = 320;
  var SNACKBAR_OVERFLOW_EXIT_MS = 380;
  var flipTimer = null;
  var COMMON_API_ERROR_MESSAGE = 'Something went wrong. Please try again.';
  var MAX_VISIBLE_API_ERROR_LENGTH = 120;
  var bodyScrollLockY = 0;
  var USER_TYPES = {
    brand: 0,
    creator: 1
  };

  function setBodyScrollLocked(shouldLock) {
    var root = document.documentElement;
    if (shouldLock) {
      if (!document.body.classList.contains('modal-open')) {
        bodyScrollLockY = window.scrollY || window.pageYOffset || 0;
        var scrollbarCompensation = Math.max(0, window.innerWidth - root.clientWidth);
        document.body.style.top = -bodyScrollLockY + 'px';
        document.body.style.position = 'fixed';
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.paddingRight = scrollbarCompensation ? scrollbarCompensation + 'px' : '';
      }
      root.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return;
    }

    root.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    document.body.style.position = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, bodyScrollLockY);
  }

  function syncBodyScrollLock(forceLocked) {
    var hasOpenModal = forceLocked || [otpModal, brandDetailsModal, brandCompanyModal, welcomeAccessModal].some(function (modal) {
      return modal && modal.classList.contains('is-open');
    });
    setBodyScrollLocked(hasOpenModal);
  }

  function getFriendlyApiErrorMessage(error, fallbackMessage) {
    var message = error && error.message ? String(error.message).trim() : '';
    if (!message) return fallbackMessage || COMMON_API_ERROR_MESSAGE;

    var looksTooDetailed =
      message.length > MAX_VISIBLE_API_ERROR_LENGTH ||
      /<[^>]+>/.test(message) ||
      /\b(stack|trace|exception|sql|syntaxerror|typeerror|referenceerror)\b/i.test(message);

    if (looksTooDetailed) return fallbackMessage || COMMON_API_ERROR_MESSAGE;
    return message;
  }

  function getStoredUserId() {
    try {
      return (
        localStorage.getItem('user_id') ||
        localStorage.getItem('influencer_id') ||
        localStorage.getItem('signup_user_id') ||
        ''
      );
    } catch (e) {
      return '';
    }
  }

  function rememberUserIdFromResponse(res) {
    var data = res && res.data;
    var first = Array.isArray(data) ? data[0] : data;
    var userId =
      (first && (first.user_id || first.id || first.influencer_id)) ||
      (res && (res.user_id || res.id || res.influencer_id)) ||
      '';
    if (!userId) return;
    try {
      localStorage.setItem('user_id', String(userId));
      localStorage.setItem('signup_user_id', String(userId));
    } catch (e) {}
  }

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
    var nextMode = isBrand ? 'brand' : 'creator';
    var currentMode = visual ? visual.getAttribute('data-mode') : '';

    if (signupToggle) {
      signupToggle.classList.toggle('is-brand', isBrand);
      signupToggle.classList.toggle('is-creator', !isBrand);
    }
    if (visual) {
      if (currentMode && currentMode !== nextMode) {
        visual.classList.add('is-flipping');
        if (flipTimer) clearTimeout(flipTimer);
        flipTimer = setTimeout(function () {
          visual.classList.remove('is-flipping');
        }, 980);
      }
      visual.classList.toggle('signup-card-wrap--brand', isBrand);
      visual.setAttribute('data-mode', nextMode);
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
    if (field.name === 'influencer_document') {
      var uploadBox = field.closest('.influencer-document-upload');
      if (uploadBox) uploadBox.classList.toggle('is-field-error', !!isInvalid);
    }
    if (field.type === 'checkbox') {
      var termsRow = field.closest('.signup-terms');
      if (termsRow) termsRow.classList.toggle('has-error', !!isInvalid);
    }
  }

  function updateInfluencerDocumentLabel() {
    if (!influencerDocumentInput || !influencerDocumentName) return;
    var file =
      influencerDocumentInput.files && influencerDocumentInput.files[0]
        ? influencerDocumentInput.files[0]
        : null;
    var uploadBox = influencerDocumentInput.closest('.influencer-document-upload');
    if (file) {
      influencerDocumentName.textContent = file.name;
      if (uploadBox) uploadBox.classList.add('has-file');
      setFieldErrorState(influencerDocumentInput, false);
      return;
    }
    influencerDocumentName.textContent = 'Upload media lisence';
    if (uploadBox) uploadBox.classList.remove('has-file');
  }

  function resetOtpState() {
    if (otpForm && typeof otpForm.reset === 'function') otpForm.reset();
    if (otpInput) {
      otpInput.value = '';
      otpInput.setCustomValidity('');
      setFieldErrorState(otpInput, false);
    }
    if (otpFeedback) {
      otpFeedback.textContent = '';
      otpFeedback.classList.remove('otp-feedback--error');
      otpFeedback.classList.remove('otp-feedback--ok');
    }
  }

  function resetSignupFormState() {
    if (signupForm && typeof signupForm.reset === 'function') signupForm.reset();
    if (passwordField) {
      passwordField.setCustomValidity('');
      setFieldErrorState(passwordField, false);
    }
    if (passwordConfirmField) {
      passwordConfirmField.setCustomValidity('');
      setFieldErrorState(passwordConfirmField, false);
    }
    passwordFieldBlurred = false;
    passwordConfirmFieldBlurred = false;

    if (signupForm) {
      var controls = signupForm.querySelectorAll('input, select, textarea');
      controls.forEach(function (control) {
        if (!control) return;
        control.setCustomValidity('');
        setFieldErrorState(control, false);
      });
    }
    lastSignupPayload = null;
    resetOtpState();
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
      resetSignupFormState();
      if (field) field.value = isBrand ? 'brand' : 'creator';
      if (signupForm) {
        signupForm.style.transition = 'opacity 0.18s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1)';
        signupForm.style.opacity = '0';
        signupForm.style.transform = 'translateY(6px)';
        setTimeout(function () {
          setMode(isBrand);
          signupForm.style.opacity = '1';
          signupForm.style.transform = 'translateY(0)';
          setTimeout(function () {
            signupForm.style.transition = '';
            signupForm.style.opacity = '';
            signupForm.style.transform = '';
          }, 220);
        }, 160);
      } else {
        setMode(isBrand);
      }
    });
  });

  // Read ?type= URL param to pre-select the correct tab on page load.
  (function applyUrlType() {
    var param = new URLSearchParams(window.location.search).get('type');
    var isBrand = param !== 'influencer';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fade-in entrance from home page transition
    if (!reduced) {
      document.documentElement.style.opacity = '0';
      document.documentElement.style.transition = 'opacity 0.42s cubic-bezier(0,0,0.2,1)';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.documentElement.style.opacity = '1';
        });
      });
    }

    var targetTab = isBrand ? document.getElementById('tab-brand') : document.getElementById('tab-creator');
    if (targetTab) {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      targetTab.classList.add('active');
      targetTab.setAttribute('aria-selected', 'true');
    }
    if (field) field.value = isBrand ? 'brand' : 'creator';
    setMode(isBrand);
  })();

  bindLiveFieldValidation(signupForm);
  bindLiveFieldValidation(brandDetailsForm);
  if (brandDetailsForm) {
    brandDetailsForm.addEventListener('scroll', updateInfluencerFormScrollButton, { passive: true });
  }
  if (brandDetailsCard && brandDetailsForm) {
    brandDetailsCard.addEventListener('wheel', function (event) {
      if (!brandDetailsModal || !brandDetailsModal.classList.contains('is-open')) return;
      if (event.target && event.target.closest('#brand-country-code-dropdown')) return;
      if (brandDetailsForm.scrollHeight <= brandDetailsForm.clientHeight + 2) return;

      var delta = event.deltaY;
      var atTop = brandDetailsForm.scrollTop <= 0;
      var atBottom =
        brandDetailsForm.scrollTop + brandDetailsForm.clientHeight >= brandDetailsForm.scrollHeight - 1;

      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) return;

      event.preventDefault();
      brandDetailsForm.scrollTop += delta;
      updateInfluencerFormScrollButton();
    }, { passive: false });
  }
  if (influencerFormScrollBtn) {
    influencerFormScrollBtn.classList.add('is-hidden');
    influencerFormScrollBtn.addEventListener('click', scrollInfluencerFormDown);
  }
  if (influencerDocumentInput) {
    influencerDocumentInput.addEventListener('change', updateInfluencerDocumentLabel);
    updateInfluencerDocumentLabel();
  }
  window.addEventListener('resize', updateInfluencerFormScrollButton);
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

  function syncOtpHiddenInput() {
    if (!otpInput) return;
    otpInput.value = otpDigitInputs.map(function (d) { return d.value; }).join('');
  }

  function clearOtpDigits() {
    otpDigitInputs.forEach(function (d) {
      d.value = '';
      d.classList.remove('is-filled', 'is-field-error');
    });
    syncOtpHiddenInput();
  }

  function openOtpModal() {
    if (!otpModal) return;
    otpModal.classList.add('is-open');
    otpModal.setAttribute('aria-hidden', 'false');
    syncBodyScrollLock(true);
    clearOtpDigits();
    if (otpDigitInputs.length) {
      setTimeout(function () { otpDigitInputs[0].focus(); }, 60);
    }
  }

  function closeOtpModal(keepBodyLock) {
    if (!otpModal) return;
    otpModal.classList.remove('is-open');
    otpModal.setAttribute('aria-hidden', 'true');
    syncBodyScrollLock(keepBodyLock);
    resetOtpState();
  }

  function updateInfluencerFormScrollButton() {
    if (!brandDetailsForm || !influencerFormScrollBtn) return;
    var hasScrollableContent = brandDetailsForm.scrollHeight > brandDetailsForm.clientHeight + 12;
    var distanceFromBottom =
      brandDetailsForm.scrollHeight - brandDetailsForm.scrollTop - brandDetailsForm.clientHeight;
    influencerFormScrollBtn.classList.toggle(
      'is-hidden',
      !hasScrollableContent || distanceFromBottom <= 18
    );
  }

  function scrollInfluencerFormDown() {
    if (!brandDetailsForm) return;
    brandDetailsForm.scrollBy({
      top: Math.max(220, Math.floor(brandDetailsForm.clientHeight * 0.72)),
      behavior: 'smooth'
    });
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
    syncBodyScrollLock(true);
    if (brandDetailsForm) {
      brandDetailsForm.scrollTop = 0;
      setTimeout(updateInfluencerFormScrollButton, 80);
    }

    // Influencer default: load UAE provinces immediately.
    // UAE country_id is 13 (per API); we still look up by name so it works if IDs change.
    try {
      if (brandCountryField && brandProvinceField) {
        var UAE_NAME = 'United Arab Emirates';
        var uaeOption = Array.prototype.find.call(
          brandCountryField.options,
          function (opt) {
            return opt && String(opt.value) === UAE_NAME;
          }
        );
        if (uaeOption) {
          brandCountryField.value = UAE_NAME;
          var uaeRow = countryRows.find(function (r) {
            return r && r.country === UAE_NAME;
          });
          if (uaeRow) {
            applyCodeSelection(uaeRow);
          } else {
            loadProvincesForSelectedCountry();
          }
        } else {
          loadProvincesForSelectedCountry();
        }
      }
    } catch (e) {}

    var firstField = brandDetailsForm ? brandDetailsForm.querySelector('input, select') : null;
    if (firstField) firstField.focus();
  }

  function closeBrandDetailsModal() {
    if (!brandDetailsModal) return;
    brandDetailsModal.classList.remove('is-open');
    brandDetailsModal.setAttribute('aria-hidden', 'true');
    syncBodyScrollLock();
    if (influencerFormScrollBtn) influencerFormScrollBtn.classList.add('is-hidden');
  }

  var brandCompanyCurrentSlide = 1;
  var BRAND_COMPANY_SLIDES = 4;

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
    syncBodyScrollLock(true);
    var firstField = brandCompanyForm ? brandCompanyForm.querySelector('.brand-company-slide.is-active input, .brand-company-slide.is-active select, .brand-company-slide.is-active textarea') : null;
    if (firstField) firstField.focus();
  }

  function closeBrandCompanyModal() {
    if (!brandCompanyModal) return;
    brandCompanyModal.classList.remove('is-open');
    brandCompanyModal.setAttribute('aria-hidden', 'true');
    syncBodyScrollLock();
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
      setFieldErrorState(brandCompanyLogoInput, false);
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

  }

  function wireBrandSlideAccordions() {
    if (!brandCompanyForm) return;
    var slide4 = brandCompanyForm.querySelector('.brand-company-slide[data-slide="4"]');
    if (!slide4) return;
    var accordions = Array.prototype.slice.call(slide4.querySelectorAll('details.brand-accordion'));
    if (accordions.length < 2) return;

    function ensureOneOpen(preferIndex) {
      var anyOpen = accordions.some(function (d) {
        return d && d.open;
      });
      if (anyOpen) return;
      var fallback = accordions[typeof preferIndex === 'number' ? preferIndex : 0] || accordions[0];
      if (fallback) fallback.open = true;
    }

    accordions.forEach(function (detailsNode, idx) {
      detailsNode.addEventListener('toggle', function () {
        if (detailsNode.open) {
          accordions.forEach(function (other) {
            if (other !== detailsNode) other.open = false;
          });
          return;
        }
        // If user closes the currently open one, force the other open.
        ensureOneOpen(idx === 0 ? 1 : 0);
      });
    });

    // Initial safety: never allow both closed.
    ensureOneOpen(0);
  }

  function openWelcomeAccessModal() {
    if (!welcomeAccessModal) return;
    welcomeAccessModal.classList.add('is-open');
    welcomeAccessModal.setAttribute('aria-hidden', 'false');
    syncBodyScrollLock(true);
  }

  function closeWelcomeAccessModal() {
    if (!welcomeAccessModal) return;
    welcomeAccessModal.classList.remove('is-open');
    welcomeAccessModal.setAttribute('aria-hidden', 'true');
    syncBodyScrollLock();
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
    if (!passwordValue || !confirmValue) {
      passwordConfirmField.setCustomValidity('');
      return true;
    }
    var isMatch = passwordValue === confirmValue;
    passwordConfirmField.setCustomValidity(isMatch ? '' : 'Passwords do not match');
    return isMatch;
  }

  function validatePasswordMatchOnBlur() {
    if (!passwordField || !passwordConfirmField) return;
    validatePasswordMatch();
    var shouldShowMismatch = passwordFieldBlurred && passwordConfirmFieldBlurred;
    if (!shouldShowMismatch) {
      setFieldErrorState(passwordConfirmField, false);
      return;
    }
    setFieldErrorState(passwordConfirmField, !passwordConfirmField.checkValidity());
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
    setCountryFromCode(row.code);
    loadProvincesForSelectedCountry();
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

  function resetProvinceOptions() {
    if (!brandProvinceField) return;
    brandProvinceField.innerHTML = '<option value="" selected disabled>Select province</option>';
  }

  async function loadProvincesForSelectedCountry() {
    if (!brandProvinceField || !brandCountryField) return;
    var fetchProvinces = getApiClientMethod('fetchProvinces');
    if (!fetchProvinces) return;

    var selectedName = String(brandCountryField.value || '');
    if (!selectedName) {
      resetProvinceOptions();
      return;
    }

    var row = findCountryRowByName(selectedName);
    if (!row || row.id == null) {
      resetProvinceOptions();
      return;
    }

    resetProvinceOptions();
    try {
      var payload = await fetchProvinces(row.id);
      var provinces = getApiResponseList(payload, ['data']);
      provinces.forEach(function (p) {
        if (!p || !p.province_name) return;
        var opt = document.createElement('option');
        opt.value = String(p.province_id || p.id || p.province_name);
        opt.setAttribute('data-province-name', String(p.province_name));
        opt.textContent = String(p.province_name);
        brandProvinceField.appendChild(opt);
      });
      if (brandProvinceField.options.length === 2) {
        brandProvinceField.selectedIndex = 1;
      }
    } catch (_) {
      // Keep placeholder if API fails.
    }
  }

  async function populateCountryFieldsFromApi() {
    if (!brandCountryField || !brandCountryCodeField) return;

    var fetchCountries = getApiClientMethod('fetchCountries');
    if (!fetchCountries) return;

    try {
      var result = await fetchCountries();
      var countries = getApiResponseList(result, ['data']);
      countryRows = normalizeCountryRows(countries);

      countryCodeByName = {};
      countryNameByCode = {};
      brandCountryField.innerHTML = '';
      if (brandNationalityCountryField) {
        brandNationalityCountryField.innerHTML = '';
      }

      countryRows.forEach(function (row) {
        countryCodeByName[row.country] = row.code;
        if (!countryNameByCode[row.code]) {
          countryNameByCode[row.code] = row.country;
        }

        var countryOption = document.createElement('option');
        countryOption.value = row.country;
        countryOption.textContent = row.country;
        brandCountryField.appendChild(countryOption);

        if (brandNationalityCountryField) {
          var nationalityOption = document.createElement('option');
          nationalityOption.value = row.country;
          nationalityOption.textContent = row.country;
          brandNationalityCountryField.appendChild(nationalityOption);
        }
      });
      filteredCodeRows = countryRows.slice();
      renderCodeDropdown(filteredCodeRows);
    } catch (_) {
      // API-only requirement: leave placeholders if fetch fails.
      try {
        console.warn('[signup] failed to load countries from API.');
      } catch (e) {}
    }
  }

  function getCategoryId(item) {
    return item && (item.category_id || item.id || item.value);
  }

  function getCategoryName(item) {
    return item && (item.category_name || item.name || item.title || item.label);
  }

  function resetNicheOptions(message) {
    if (!influencerNicheField) return;
    influencerNicheField.innerHTML = '';
    var opt = document.createElement('option');
    opt.value = '';
    opt.textContent = message || 'Select niche';
    opt.disabled = true;
    opt.selected = true;
    influencerNicheField.appendChild(opt);
  }

  async function populateInfluencerCategories() {
    if (!influencerCategoryField) return;
    var fetchCategories = getApiClientMethod('fetchCategories');
    if (!fetchCategories) return;

    try {
      var result = await fetchCategories();
      var categories = getApiResponseList(result, ['categories', 'data']);
      influencerCategoryField.innerHTML = '<option value="" selected disabled>Select category</option>';
      categories.forEach(function (item) {
        var id = getCategoryId(item);
        var name = getCategoryName(item);
        if (id == null || !name) return;
        var opt = document.createElement('option');
        opt.value = String(id);
        opt.textContent = String(name);
        influencerCategoryField.appendChild(opt);
      });
    } catch (_) {
      // Keep placeholder if API fails.
    }
  }

  async function populateInfluencerNiches(categoryId) {
    if (!influencerNicheField) return;
    resetNicheOptions(categoryId ? 'Loading niches...' : 'Select category first');
    influencerNicheField.disabled = true;
    if (!categoryId) return;

    var fetchNiches = getApiClientMethod('fetchNiches');
    if (!fetchNiches) return;

    try {
      var result = await fetchNiches(categoryId);
      var niches = getApiResponseList(result, ['niches', 'data']);
      resetNicheOptions('Select niche');
      niches.forEach(function (item) {
        var id = item && (item.niche_id || item.id || item.value);
        var name = item && (item.niche_name || item.name || item.title || item.label);
        if (id == null || !name) return;
        var opt = document.createElement('option');
        opt.value = String(id);
        opt.textContent = String(name);
        influencerNicheField.appendChild(opt);
      });
      influencerNicheField.disabled = false;
    } catch (_) {
      resetNicheOptions('Select niche');
      influencerNicheField.disabled = false;
    }
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async function (event) {
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
      var formData = new FormData(signupForm);
      var email = String(formData.get('email') || '').trim();
      var password = String(formData.get('password') || '');
      var accountType = String(formData.get('account_type') || 'brand');
      var payload = {
        email: email,
        password: password,
        user_type: getSignupUserType(accountType)
      };
      lastSignupPayload = payload;

      var submitSignup = getApiClientMethod('signup');
      if (!submitSignup) {
        showSignupSnackbar({
          type: 'error',
          message: 'Signup API is not available.',
          actionLabel: 'OK'
        });
        return;
      }

      showSignupSnackbar({
        type: 'info',
        message: 'Creating your account…',
        actionLabel: 'Wait'
      });

      try {
        var res = await submitSignup(payload);
        if (res && res.success === false) {
          throw new Error(res.error || res.message || 'Signup failed');
        }
        rememberUserIdFromResponse(res);
        showSignupSnackbar({
          type: 'success',
          message: 'Signup submitted. Enter OTP to continue.',
          actionLabel: 'Continue',
          onAction: function () {
            if (otpInput) otpInput.focus();
          }
        });
        openOtpModal();
      } catch (err) {
        showSignupSnackbar({
          type: 'error',
          message: getFriendlyApiErrorMessage(err, 'Signup failed. Please try again.'),
          actionLabel: 'Retry'
        });
      }
    });
  }

  if (passwordField && passwordConfirmField) {
    passwordField.addEventListener('input', function () {
      passwordConfirmField.setCustomValidity('');
      setFieldErrorState(passwordConfirmField, false);
    });
    passwordConfirmField.addEventListener('input', function () {
      passwordConfirmField.setCustomValidity('');
      setFieldErrorState(passwordConfirmField, false);
    });
    passwordField.addEventListener('blur', function () {
      passwordFieldBlurred = true;
      validatePasswordMatchOnBlur();
    });
    passwordConfirmField.addEventListener('blur', function () {
      passwordConfirmFieldBlurred = true;
      validatePasswordMatchOnBlur();
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

  /* ── Wire 6-digit OTP inputs ── */
  if (otpDigitInputs.length) {
    otpDigitInputs.forEach(function (digitInput, idx) {
      digitInput.addEventListener('input', function () {
        var val = digitInput.value.replace(/\D/g, '');
        digitInput.value = val.slice(0, 1);
        digitInput.classList.toggle('is-filled', !!digitInput.value);
        digitInput.classList.remove('is-field-error');
        syncOtpHiddenInput();
        if (val && idx < otpDigitInputs.length - 1) {
          otpDigitInputs[idx + 1].focus();
        }
      });

      digitInput.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !digitInput.value && idx > 0) {
          e.preventDefault();
          otpDigitInputs[idx - 1].value = '';
          otpDigitInputs[idx - 1].classList.remove('is-filled');
          otpDigitInputs[idx - 1].focus();
          syncOtpHiddenInput();
        }
        if (e.key === 'ArrowLeft' && idx > 0) {
          e.preventDefault();
          otpDigitInputs[idx - 1].focus();
        }
        if (e.key === 'ArrowRight' && idx < otpDigitInputs.length - 1) {
          e.preventDefault();
          otpDigitInputs[idx + 1].focus();
        }
      });

      digitInput.addEventListener('paste', function (e) {
        e.preventDefault();
        var pasted = (e.clipboardData || window.clipboardData || { getData: function () { return ''; } }).getData('text');
        var digits = pasted.replace(/\D/g, '').slice(0, 6).split('');
        digits.forEach(function (d, i) {
          if (otpDigitInputs[i]) {
            otpDigitInputs[i].value = d;
            otpDigitInputs[i].classList.add('is-filled');
            otpDigitInputs[i].classList.remove('is-field-error');
          }
        });
        syncOtpHiddenInput();
        var focusIdx = Math.min(digits.length, otpDigitInputs.length - 1);
        otpDigitInputs[focusIdx].focus();
      });

      digitInput.addEventListener('focus', function () {
        digitInput.select();
      });
    });
  }

  if (otpForm) {
    otpForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!otpInput || !otpFeedback) return;
      syncOtpHiddenInput();
      if (!otpInput.value || otpInput.value.length !== 6) {
        otpDigitInputs.forEach(function (d) {
          if (!d.value) d.classList.add('is-field-error');
        });
        var firstEmpty = otpDigitInputs.find(function (d) { return !d.value; });
        showSignupSnackbar({
          type: 'error',
          message: 'Please enter the 6-digit OTP code.',
          actionLabel: 'Retry',
          onAction: function () {
            if (firstEmpty) firstEmpty.focus();
          }
        });
        otpFeedback.textContent = 'Please enter the 6-digit OTP.';
        otpFeedback.classList.remove('otp-feedback--ok');
        otpFeedback.classList.add('otp-feedback--error');
        if (firstEmpty) firstEmpty.focus();
        return;
      }
      var submitOtp = getApiClientMethod('submitOtp');
      if (!submitOtp || !lastSignupPayload) {
        showSignupSnackbar({
          type: 'error',
          message: 'OTP API is not available. Please submit signup again.',
          actionLabel: 'OK'
        });
        return;
      }

      var otpPayload = {
        email: lastSignupPayload.email,
        password: lastSignupPayload.password,
        user_type: lastSignupPayload.user_type,
        otp: String(otpInput.value || '').trim()
      };

      otpFeedback.textContent = 'Verifying OTP...';
      otpFeedback.classList.remove('otp-feedback--error');
      otpFeedback.classList.remove('otp-feedback--ok');

      try {
        var res = await submitOtp(otpPayload);
        if (res && res.success === false) {
          throw new Error(res.error || res.message || 'OTP verification failed');
        }
        rememberUserIdFromResponse(res);
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
      } catch (err) {
        var msg = getFriendlyApiErrorMessage(err, 'OTP verification failed. Please try again.');
        otpFeedback.textContent = msg;
        otpFeedback.classList.remove('otp-feedback--ok');
        otpFeedback.classList.add('otp-feedback--error');
        showSignupSnackbar({
          type: 'error',
          message: msg,
          actionLabel: 'Retry',
          onAction: function () {
            otpInput.focus();
          }
        });
      }
    });
  }

  function readBlobAsDataUrl(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(typeof reader.result === 'string' ? reader.result : '');
      };
      reader.onerror = function () {
        reject(new Error('Could not read image.'));
      };
      reader.readAsDataURL(blob);
    });
  }

  if (brandLogoUrlBtn && brandLogoUrlInput) {
    brandLogoUrlBtn.addEventListener('click', async function () {
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

      try {
        var uploadResponse = await fetch(url);
        if (!uploadResponse.ok) throw new Error('Fetch failed');

        var blob = await uploadResponse.blob();
        var fileType = blob.type || '';
        var fakeFile = { type: fileType, size: blob.size };
        var v = validateFile(fakeFile);
        if (!v.ok) throw new Error(v.message);

        var dataUrl = await readBlobAsDataUrl(blob);
        if (!dataUrl) throw new Error('Could not read image.');

        applyLogoDataUrl(dataUrl);
        showSignupSnackbar({ type: 'success', message: 'Image imported from URL.', actionLabel: 'OK' });
      } catch (err) {
        showSignupSnackbar({ type: 'error', message: getFriendlyApiErrorMessage(err, 'Could not import image.'), actionLabel: 'OK' });
        clearLogo();
      } finally {
        brandLogoUrlBtn.disabled = false;
        brandLogoUrlBtn.textContent = 'Upload';
      }
    });
  }

  if (otpResendBtn && otpFeedback) {
    otpResendBtn.addEventListener('click', function () {
      clearOtpDigits();
      if (otpDigitInputs.length) {
        otpDigitInputs[0].focus();
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
    brandDetailsForm.addEventListener('submit', async function (event) {
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
      var isBrandAccount = field && field.value === 'brand';

      // Influencer: submit details via /influencers/tell-us
      if (!isBrandAccount) {
        var submitInfluencerDetails = getApiClientMethod('influencerTellUs');
        if (!submitInfluencerDetails) {
          showSignupSnackbar({
            type: 'error',
            message: 'Influencer details API is not available.',
            actionLabel: 'OK'
          });
          return;
        }

        var formData = new FormData(brandDetailsForm);
        var payload = buildInfluencerTellUsPayload(formData);

        showSignupSnackbar({
          type: 'info',
          message: 'Saving your profile details…',
          actionLabel: 'Wait'
        });

        try {
          var res = await submitInfluencerDetails(payload);
          if (res && res.success === false) {
            throw new Error(res.error || res.message || 'Details submission failed');
          }
          try {
            var influencerId =
              (res && res.data && res.data[0] && res.data[0].influencer_id) ||
              res.influencer_id ||
              null;
            if (influencerId != null) {
              window.INFLUENCER_ID = influencerId;
              localStorage.setItem('influencer_id', String(influencerId));
              localStorage.setItem('user_id', String(influencerId));
            }
          } catch (e) {}
          closeBrandDetailsModal();
          openWelcomeAccessModal();
          showSignupSnackbar({
            type: 'success',
            message: 'Profile submitted successfully.',
            actionLabel: 'Great'
          });
        } catch (err) {
          var detailsErrorMessage = getFriendlyApiErrorMessage(err, 'Details submission failed. Please try again.');
          showSignupSnackbar({
            type: 'error',
            message: detailsErrorMessage,
            actionLabel: 'Retry'
          });
        }
        return;
      }

      // Brand: keep existing UI-only flow.
      closeBrandDetailsModal();
      openWelcomeAccessModal();
      showSignupSnackbar({
        type: 'success',
        message: 'Brand profile submitted successfully.',
        actionLabel: 'Great'
      });
    });
  }

  if (brandCompanyForm) {
    bindLiveFieldValidation(brandCompanyForm);
    wireBrandIndustryCategory();
    wireBrandLogoUpload();
    wireBrandSlideAccordions();
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

  if (brandCountryField) {
    brandCountryField.addEventListener('change', function () {
      if (!brandCountryCodeField || !brandCountryCodeDisplay) return;
      var rowMatch = findCountryRowByName(brandCountryField.value);
      if (rowMatch) {
        applyCodeSelection(rowMatch);
      } else {
        brandCountryCodeField.value = '';
        brandCountryCodeDisplay.value = '';
        resetProvinceOptions();
      }
    });
  }

  if (influencerCategoryField) {
    influencerCategoryField.addEventListener('change', function () {
      populateInfluencerNiches(influencerCategoryField.value);
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

  function getApiClientMethod(name) {
    return window.API_CLIENT && typeof window.API_CLIENT[name] === 'function'
      ? window.API_CLIENT[name].bind(window.API_CLIENT)
      : null;
  }

  function getApiResponseList(result, keys) {
    if (Array.isArray(result)) return result;
    for (var i = 0; i < keys.length; i++) {
      if (result && Array.isArray(result[keys[i]])) return result[keys[i]];
    }
    return [];
  }

  function getSignupUserType(accountType) {
    return accountType === 'creator' ? USER_TYPES.creator : USER_TYPES.brand;
  }

  function normalizeCountryRows(countries) {
    return (countries || []).map(function (c) {
      return {
        id: c.country_id || c.id || null,
        country: c.country_name || c.name || c.country || '',
        code: c.phone_code || c.dial_code || c.code || '',
        region: c.country_code || c.iso || c.region || ''
      };
    }).filter(function (r) { return r.country && r.code; });
  }

  function findCountryRowByName(name) {
    return countryRows.find(function (r) { return r.country === name; }) || null;
  }

  function buildInfluencerTellUsPayload(formData) {
    var userId = getStoredUserId();
    var fd = new FormData();
    for (var pair of formData.entries()) {
      fd.append(pair[0], pair[1]);
    }
    if (userId) fd.append('user_id', userId);
    // Map province field value to province name if it's an ID
    var provinceVal = formData.get('brand_province');
    if (provinceVal && brandProvinceField) {
      var selectedOpt = Array.prototype.find.call(
        brandProvinceField.options,
        function (o) { return o.value === provinceVal; }
      );
      var provinceName = selectedOpt
        ? (selectedOpt.getAttribute('data-province-name') || selectedOpt.textContent)
        : provinceVal;
      fd.set('brand_province', provinceName);
    }
    var docFile = influencerDocumentInput && influencerDocumentInput.files && influencerDocumentInput.files[0]
      ? influencerDocumentInput.files[0] : null;
    if (docFile) fd.set('influencer_document', docFile);
    return fd;
  }

  function populateBrandCompanySizes() {
    if (!brandCompanySizeField) return;
    var fetchBrandSizes = getApiClientMethod('fetchBrandSizes');
    if (!fetchBrandSizes) return;
    fetchBrandSizes().then(function (result) {
      var sizes = getApiResponseList(result, ['data']);
      if (!sizes.length) return;
      brandCompanySizeField.innerHTML = '<option value="" disabled selected>Select company size</option>';
      sizes.forEach(function (s) {
        var val = s.brand_size || s.name || s.value || s;
        var opt = document.createElement('option');
        opt.value = String(val);
        opt.textContent = String(val);
        brandCompanySizeField.appendChild(opt);
      });
    }).catch(function () {});
  }

  populateCountryFieldsFromApi();
  populateInfluencerCategories();
  populateBrandCompanySizes();
})();
