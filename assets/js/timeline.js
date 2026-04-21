(function() {
  var entries = [
    {
      id: 'ring-mgr',
      title: 'Engineering Manager @ Ring (Amazon)',
      url: 'https://ring.com',
      category: 'experience',
      start: '2023-05',
      end: '2025-09',
      icon: '/assets/img/icons/ring.png',
      bullets: [
        'Managed the embedded firmware team owning both the Ring Smart Lighting and Ring Alarm sensor product lines',
        'Expanded scope to include Ring Alarm edge devices: contact sensor, motion sensor, glass break sensor, flood & freeze sensor, and panic button',
        'Led the team through multiple Amazon Sidewalk protocol migrations across the existing product fleet',
        'Responsible for firmware running on tens of millions of customer devices'
      ]
    },
    {
      id: 'ring-sde',
      title: 'Embedded Software Engineer @ Ring (Amazon)',
      url: 'https://ring.com',
      category: 'experience',
      start: '2018-09',
      end: '2023-05',
      icon: '/assets/img/icons/ring.png',
      bullets: [
        'Sole firmware engineer for the Ring Smart Lighting product line at launch',
        'Personally wrote the firmware to ship 16 products in the first two years \u2014 7 in year one, 9 in year two',
        'Product range included pathlights, steplights, spotlights, floodlights, motion sensor, mailbox sensor, smart bulb, outdoor plug, and the Smart Lighting Bridge',
        'Transitioned into a technical leadership role, guiding the team through porting the full product line to successive versions of the Amazon Sidewalk protocol'
      ]
    },
    {
      id: 'intersect',
      title: 'Co-Founder @ Intersect Lab',
      category: 'experience',
      start: '2017-10',
      end: '2018-09',
      icon: '/assets/img/icons/intersect.png',
      bullets: [
        'Co-founded a full-stack IoT consultancy \u2014 one team delivering all the software a connected product needs: mobile apps, embedded firmware, and cloud infrastructure',
        'Clients hired us to go from concept to working product without coordinating across multiple vendors',
        'Worked directly with clients to develop project plans and budgets, always prioritizing delivering usefulness to customers first'
      ]
    },
    {
      id: 'startupbus-director',
      title: 'Director of StartupBus North America 2017',
      url: 'https://www.startupbus.com',
      category: 'leadership',
      start: '2016-12',
      end: '2017-08',
      icon: '/assets/img/icons/startupbus.png',
      bullets: [
        'Recruited and led 14 regional leaders across 7 StartupBuses in the US and Mexico',
        'Led the leanest national StartupBus ever, saving the organization over $50,000',
        'Maintained full scale of operations despite reduced budget'
      ]
    },
    {
      id: 'startupbus-conductor',
      title: 'StartupBus Conductor',
      url: 'https://www.startupbus.com',
      category: 'leadership',
      start: '2015-12',
      end: '2016-05',
      icon: '/assets/img/icons/startupbus.png',
      bullets: [
        'Recruited for one of the most participated-in regional StartupBuses ever with 30+ participants',
        'Helped fundraise over $30,000 in regional sponsorship',
        'Established sponsorship relations that continued for years'
      ]
    },
    {
      id: 'leandog',
      title: 'Agile Consultant @ Leandog Inc. (Rockwell Automation)',
      url: 'https://leandog.com',
      category: 'experience',
      start: '2015-07',
      end: '2016-04',
      icon: '/assets/img/icons/leandog.png',
      bullets: [
        'Led the introduction of Agile and LEAN practices to product and development teams',
        'Assisted with managing 2 teams of 16+ developers across the US and Poland',
        'Developed on FactoryTalk TeamOne \u2014 a mobile app using a distributed database on a mesh network of peer-to-peer WiFi and Bluetooth to overcome electrical interference in factories'
      ]
    },
    {
      id: 'motl',
      title: 'Make on the Lake Co-Organizer',
      url: 'https://www.meetup.com/makeonthelake/',
      category: 'leadership',
      start: '2015-01',
      end: '2018-01',
      icon: '/assets/img/icons/meetup.png',
      bullets: [
        'Helped grow a 1,200+ member maker meetup in Cleveland, Ohio',
        'Worked with local high schools to promote technology education',
        'Developed and led beginner-level maker workshops'
      ]
    },
    {
      id: 'contractor',
      title: 'Independent Contractor',
      category: 'experience',
      start: '2014-02',
      end: '2015-06',
      icon: '/assets/img/icons/contractor.png',
      bullets: [
        'Developed and maintained business relationships with clients',
        'Led development efforts building web and mobile apps for startups and nonprofits'
      ]
    },
    {
      id: 'allegheny',
      title: 'Software Engineering \u2014 Allegheny College',
      url: 'https://allegheny.edu',
      category: 'education',
      start: '2011-05',
      end: '2011-05',
      icon: '/assets/img/icons/allegheny.png',
      bullets: [
        'Awarded the 2011 Allegheny Student Chapter Prize for the best senior thesis in Computer Science',
        'Thesis: An Internet Application for Augmenting the Study of Computer Science \u2014 a 316-page technical report',
        'Built the XInteract web application, used to teach CS111 in Fall 2011'
      ]
    }
  ];

  // Life events — annotations on the timeline
  var lifeEvents = [
    { date: '2013-11', label: 'moved to CLE', position: 'below', tilt: -3, arrowTilt: 8 },
    { date: '2018-01', label: 'moved to PIT', position: 'below', tilt: 2, arrowTilt: -6 }
  ];

  var lanes = ['experience', 'leadership', 'education'];

  var categoryColors = {
    experience: 'var(--accent)',
    leadership: 'var(--timeline-leadership)',
    education: 'var(--timeline-education)'
  };

  var categoryLabels = {
    experience: 'Work',
    leadership: 'Leadership',
    education: 'Education'
  };

  function parseDate(s) {
    var parts = s.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
  }

  var globalStart = parseDate('2011-01');
  var globalEnd = parseDate('2026-01');
  var totalMs = globalEnd - globalStart;

  function pctFromDate(dateStr) {
    return ((parseDate(dateStr) - globalStart) / totalMs) * 100;
  }

  var pct = pctFromDate;

  // Pre-compute monotonically decreasing cursor positions for each entry.
  // Entries are in reverse chronological order (newest first), so as you
  // scroll down, the cursor must always move left.
  var cursorPositions = [];
  (function() {
    var prevPct = 100;
    for (var i = 0; i < entries.length; i++) {
      var s = pctFromDate(entries[i].start);
      var e = pctFromDate(entries[i].end);
      var mid = (s + e) / 2;
      mid = Math.min(mid, prevPct);
      cursorPositions.push(mid);
      prevPct = mid;
    }
  })();

  function formatDate(dateStr) {
    var d = parseDate(dateStr);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function entryIndex(id) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].id === id) return i;
    }
    return 0;
  }

  // Check for reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Build sticky timeline ----
  var sticky = document.getElementById('timeline-sticky');
  sticky.setAttribute('role', 'region');
  sticky.setAttribute('aria-label', 'Career timeline');
  var inner = document.createElement('div');
  inner.className = 'timeline-inner';

  // Legend (at top)
  var legend = document.createElement('div');
  legend.className = 'timeline-legend';
  lanes.forEach(function(lane) {
    var item = document.createElement('span');
    item.className = 'timeline-legend-item';

    var dot = document.createElement('span');
    dot.className = 'timeline-legend-dot';
    dot.style.background = categoryColors[lane];
    item.appendChild(dot);

    var labelEl = document.createElement('span');
    labelEl.textContent = categoryLabels[lane];
    item.appendChild(labelEl);

    legend.appendChild(item);
  });
  inner.appendChild(legend);

  // Year labels
  var yearsRow = document.createElement('div');
  yearsRow.className = 'timeline-years';
  for (var y = 2012; y <= 2026; y += 2) {
    var lbl = document.createElement('span');
    lbl.className = 'timeline-year';
    lbl.textContent = y;
    lbl.style.left = pct(y + '-01') + '%';
    yearsRow.appendChild(lbl);
  }
  inner.appendChild(yearsRow);

  // Lanes
  var fillElements = {};
  lanes.forEach(function(lane) {
    var laneEl = document.createElement('div');
    laneEl.className = 'timeline-lane';
    laneEl.setAttribute('data-lane', lane);

    var track = document.createElement('div');
    track.className = 'timeline-lane-track';
    laneEl.appendChild(track);

    var fill = document.createElement('div');
    fill.className = 'timeline-fill';
    fill.style.background = categoryColors[lane];
    laneEl.appendChild(fill);
    fillElements[lane] = fill;

    // Add dots for this lane
    entries.forEach(function(entry) {
      if (entry.category !== lane) return;

      var dot = document.createElement('button');
      dot.className = 'timeline-dot';
      if (entry.icon) dot.classList.add('has-icon');
      dot.setAttribute('data-id', entry.id);
      dot.setAttribute('aria-label', entry.title);
      dot.style.left = pct(entry.start) + '%';
      dot.style.setProperty('--dot-color', categoryColors[entry.category]);

      if (entry.icon) {
        var img = document.createElement('img');
        img.src = entry.icon;
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.draggable = false;
        dot.appendChild(img);
      }

      dot.addEventListener('click', function() {
        highlightEntry(entry.id);
        var el = document.querySelector('.resume-item[data-id="' + entry.id + '"]');
        if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      });

      laneEl.appendChild(dot);
    });

    inner.appendChild(laneEl);
  });

  // Life event annotations
  // Hand-drawn SVG arrow paths
  var arrowUp = 'M8 14 C7 10, 9 6, 8 2 M5 5 C6 3, 8 2, 8 2 C8 2, 10 3, 11 5';
  var arrowDown = 'M8 2 C7 6, 9 10, 8 14 M5 11 C6 13, 8 14, 8 14 C8 14, 10 13, 11 11';

  lifeEvents.forEach(function(evt) {
    var annotation = document.createElement('div');
    annotation.className = 'timeline-annotation timeline-annotation-' + evt.position;
    annotation.setAttribute('aria-hidden', 'true');
    annotation.style.left = pct(evt.date) + '%';
    if (evt.tilt) annotation.style.rotate = evt.tilt + 'deg';

    var label = document.createElement('span');
    label.className = 'timeline-annotation-label';
    label.textContent = evt.label;
    annotation.appendChild(label);

    var arrow = document.createElement('span');
    arrow.className = 'timeline-annotation-arrow';
    if (evt.arrowTilt) arrow.style.rotate = evt.arrowTilt + 'deg';
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', evt.position === 'below' ? arrowUp : arrowDown);
    svg.appendChild(path);
    arrow.appendChild(svg);
    annotation.appendChild(arrow);

    inner.appendChild(annotation);
  });

  // Cursor line
  var cursor = document.createElement('div');
  cursor.className = 'timeline-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  inner.appendChild(cursor);

  sticky.appendChild(inner);

  // ---- Build resume list ----
  var list = document.getElementById('resume-list');

  var resumeHeading = document.createElement('h2');
  resumeHeading.className = 'sr-only';
  resumeHeading.textContent = 'Experience';
  list.appendChild(resumeHeading);

  entries.forEach(function(entry) {
    var item = document.createElement('div');
    item.className = 'resume-item';
    item.setAttribute('data-id', entry.id);
    item.setAttribute('tabindex', '0');

    var header = document.createElement('div');
    header.className = 'resume-item-header';

    var h3 = document.createElement('h3');
    if (entry.icon) {
      var icon = document.createElement('img');
      icon.className = 'resume-item-icon';
      icon.src = entry.icon;
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');
      h3.appendChild(icon);
    }
    if (entry.url) {
      var titleLink = document.createElement('a');
      titleLink.href = entry.url;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      titleLink.textContent = entry.title;
      h3.appendChild(titleLink);
    } else {
      var titleSpan = document.createElement('span');
      titleSpan.textContent = entry.title;
      h3.appendChild(titleSpan);
    }
    header.appendChild(h3);

    var dates = document.createElement('span');
    dates.className = 'resume-item-dates';
    if (entry.start === entry.end) {
      dates.textContent = 'Class of ' + parseDate(entry.start).getFullYear();
    } else {
      dates.textContent = formatDate(entry.start) + ' \u2014 ' + formatDate(entry.end);
    }
    header.appendChild(dates);

    item.appendChild(header);

    var badge = document.createElement('span');
    badge.className = 'resume-item-badge';
    badge.style.background = categoryColors[entry.category];
    badge.textContent = categoryLabels[entry.category];
    item.appendChild(badge);

    var ul = document.createElement('ul');
    entry.bullets.forEach(function(b) {
      var li = document.createElement('li');
      li.textContent = b;
      ul.appendChild(li);
    });
    item.appendChild(ul);

    // Hover interaction
    item.addEventListener('mouseenter', function() {
      hoverActive = true;
      highlightEntry(entry.id);
    });
    item.addEventListener('mouseleave', function() {
      hoverActive = false;
      clearHighlight();
      updateCursor();
    });
    // Keyboard focus interaction
    item.addEventListener('focusin', function() {
      hoverActive = true;
      highlightEntry(entry.id);
    });
    item.addEventListener('focusout', function() {
      hoverActive = false;
      clearHighlight();
      updateCursor();
    });

    list.appendChild(item);
  });

  // ---- Highlight logic ----
  var activeId = null;
  var hoverActive = false;

  function highlightEntry(id) {
    activeId = id;
    var entry = entries.find(function(e) { return e.id === id; });

    document.querySelectorAll('.timeline-dot').forEach(function(d) {
      d.classList.toggle('active', d.getAttribute('data-id') === id);
    });

    Object.keys(fillElements).forEach(function(lane) {
      fillElements[lane].classList.remove('visible');
    });
    var fill = fillElements[entry.category];
    var startPct = pct(entry.start);
    var endPct = pct(entry.end);
    if (startPct === endPct) {
      startPct = Math.max(0, startPct - 0.5);
      endPct = endPct + 0.5;
    }
    fill.style.left = startPct + '%';
    fill.style.width = (endPct - startPct) + '%';
    fill.classList.add('visible');

    document.querySelectorAll('.resume-item').forEach(function(el) {
      var isActive = el.getAttribute('data-id') === id;
      el.classList.toggle('highlighted', isActive);
      if (isActive) {
        el.setAttribute('aria-current', 'true');
      } else {
        el.removeAttribute('aria-current');
      }
    });
  }

  function clearHighlight() {
    activeId = null;
    document.querySelectorAll('.timeline-dot').forEach(function(d) {
      d.classList.remove('active');
    });
    Object.keys(fillElements).forEach(function(lane) {
      fillElements[lane].classList.remove('visible');
    });
    document.querySelectorAll('.resume-item').forEach(function(el) {
      el.classList.remove('highlighted');
      el.removeAttribute('aria-current');
    });
  }

  // ---- Header height for sticky offset ----
  function measureHeader() {
    var header = document.querySelector('.site-header');
    if (header) {
      var h = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', h + 'px');
    }
  }
  measureHeader();
  window.addEventListener('resize', measureHeader);

  // ---- Scroll-driven cursor ----
  // Uses the pre-computed monotonic cursor positions so the line
  // always moves left as the user scrolls down.
  function updateCursor() {
    var items = document.querySelectorAll('.resume-item');
    if (!items.length) return;

    var viewportH = window.innerHeight;
    var centerY = viewportH / 2;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight;

    // At the very top of the page, pin cursor to the latest date (right side)
    if (scrollTop <= 10) {
      cursor.style.left = pct(entries[0].end) + '%';
      if (!hoverActive) highlightEntry(entries[0].id);
      return;
    }

    // At the very bottom of the page, pin cursor to the earliest date (left side)
    if (scrollTop + viewportH >= docHeight - 10) {
      cursor.style.left = pct(entries[entries.length - 1].start) + '%';
      if (!hoverActive) highlightEntry(entries[entries.length - 1].id);
      return;
    }

    // Find which two items flank the viewport center
    var aboveIdx = -1;
    var belowIdx = -1;
    var aboveDist = Infinity;
    var belowDist = Infinity;
    var closestIdx = 0;
    var closestDist = Infinity;

    for (var i = 0; i < items.length; i++) {
      var rect = items[i].getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      var dist = Math.abs(mid - centerY);

      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }

      if (mid <= centerY && (centerY - mid) < aboveDist) {
        aboveDist = centerY - mid;
        aboveIdx = i;
      }
      if (mid >= centerY && (mid - centerY) < belowDist) {
        belowDist = mid - centerY;
        belowIdx = i;
      }
    }

    var cursorPctVal;
    if (aboveIdx >= 0 && belowIdx >= 0 && aboveIdx !== belowIdx) {
      var t = aboveDist / (aboveDist + belowDist);
      var aboveCursorPct = cursorPositions[aboveIdx];
      var belowCursorPct = cursorPositions[belowIdx];
      cursorPctVal = aboveCursorPct + t * (belowCursorPct - aboveCursorPct);
    } else {
      cursorPctVal = cursorPositions[closestIdx];
    }

    cursorPctVal = Math.max(0, Math.min(100, cursorPctVal));
    cursor.style.left = cursorPctVal + '%';

    // Highlight closest item on scroll (only if not hovering)
    if (hoverActive) return;
    if (closestDist < viewportH * 0.4) {
      highlightEntry(entries[closestIdx].id);
    }
  }

  window.addEventListener('scroll', function() {
    updateCursor();
  }, { passive: true });

  updateCursor();
})();
