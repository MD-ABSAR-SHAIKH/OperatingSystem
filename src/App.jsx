import { useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const days = [
    {
        day: 1,
        title: "Memory Management Basics",
        module: "Memory Management",
        status: "completed",
        description:
            "Understanding why operating systems need memory management and how RAM is organized.",
        topics: [
            "What is memory management?",
            "Physical memory",
            "Virtual memory",
            "Pages and frames",
            "Memory protection",
        ],
    },
    {
        day: 2,
        title: "Memory Map",
        module: "Memory Management",
        status: "current",
        description:
            "Understanding the memory map provided by the bootloader and identifying usable and reserved memory.",
        topics: [
            "Bootloader memory map",
            "Reserved memory",
            "Usable memory",
            "Kernel memory",
            "Memory regions",
        ],
    },
    {
        day: 3,
        title: "Physical Memory Manager",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Learning how physical RAM is divided into fixed-size frames.",
        topics: [
            "Physical frames",
            "4 KB pages",
            "Frame tracking",
            "Free frames",
            "Used frames",
        ],
    },
    {
        day: 4,
        title: "Bitmap Allocator",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Designing a bitmap to efficiently track free and occupied physical frames.",
        topics: [
            "Bitmap structure",
            "Bit manipulation",
            "Free frame search",
            "Frame allocation",
        ],
    },
    {
        day: 5,
        title: "Frame Allocation",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Implementing the first working physical memory allocation functions.",
        topics: [
            "alloc_frame()",
            "free_frame()",
            "Testing allocation",
            "Memory accounting",
        ],
    },
    {
        day: 6,
        title: "Paging Fundamentals",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Understanding how virtual pages are mapped to physical frames.",
        topics: [
            "Paging",
            "Pages",
            "Frames",
            "Page tables",
            "Address translation",
        ],
    },
    {
        day: 7,
        title: "Page Tables",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Learning how page tables store virtual-to-physical mappings.",
        topics: [
            "Page table entries",
            "Present bit",
            "Read/write",
            "User/supervisor",
        ],
    },
    {
        day: 8,
        title: "Virtual Address Translation",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Following a virtual address through the MMU and page tables.",
        topics: [
            "Virtual address",
            "Page number",
            "Offset",
            "Physical address",
        ],
    },
    {
        day: 9,
        title: "Page Mapping",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Implementing virtual page to physical frame mappings.",
        topics: [
            "map_page()",
            "unmap_page()",
            "Page permissions",
            "Mapping validation",
        ],
    },
    {
        day: 10,
        title: "Paging Test",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Testing the first complete paging implementation.",
        topics: [
            "Mapping test",
            "Unmapping test",
            "Address verification",
            "Debugging",
        ],
    },

    // -------------------------------------------------------
    // Example future days
    // -------------------------------------------------------

    {
        day: 11,
        title: "Kernel Heap",
        module: "Memory Management",
        status: "upcoming",
        description: "Creating dynamic memory allocation for the kernel.",
        topics: ["kmalloc()", "kfree()", "Heap", "Free list"],
    },
    {
        day: 12,
        title: "Kernel Heap Testing",
        module: "Memory Management",
        status: "upcoming",
        description: "Testing dynamic kernel memory allocation.",
        topics: ["Allocation", "Deallocation", "Fragmentation", "Testing"],
    },
    {
        day: 13,
        title: "Page Faults",
        module: "Memory Management",
        status: "upcoming",
        description: "Understanding and handling page faults.",
        topics: ["Page fault", "Fault handler", "Error codes", "Debugging"],
    },
    {
        day: 14,
        title: "Memory Protection",
        module: "Memory Management",
        status: "upcoming",
        description: "Protecting kernel and process memory.",
        topics: ["Permissions", "Isolation", "User mode", "Kernel mode"],
    },
    {
        day: 15,
        title: "Memory Management Review",
        module: "Memory Management",
        status: "upcoming",
        description:
            "Reviewing everything implemented so far before moving forward.",
        topics: ["PMM", "Paging", "Heap", "Protection"],
    },

    {
        day: 16,
        title: "Process Memory",
        module: "Process Management",
        status: "upcoming",
        description: "Understanding how processes use memory.",
        topics: ["Process address space", "Stack", "Heap", "Code", "Data"],
    },
    {
        day: 17,
        title: "Process Address Spaces",
        module: "Process Management",
        status: "upcoming",
        description: "Creating isolated address spaces for processes.",
        topics: ["Page directories", "Isolation", "Kernel mapping"],
    },
    {
        day: 18,
        title: "Context Switching",
        module: "Process Management",
        status: "upcoming",
        description: "Understanding how the OS switches between processes.",
        topics: ["Registers", "Process state", "Address space"],
    },
    {
        day: 19,
        title: "Process Creation",
        module: "Process Management",
        status: "upcoming",
        description: "Starting the process creation subsystem.",
        topics: ["PID", "PCB", "Process creation"],
    },
    {
        day: 20,
        title: "Process Testing",
        module: "Process Management",
        status: "upcoming",
        description: "Testing basic process execution.",
        topics: ["Process test", "Memory isolation", "Debugging"],
    },
];

/* =========================================================
   MODULE DATA
   ========================================================= */

const modules = [
    {
        number: "01",
        name: "Memory Management",
        range: "DAY 01 — 30",
        progress: 15,
    },
    {
        number: "02",
        name: "Process Management",
        range: "DAY 31 — 55",
        progress: 0,
    },
    {
        number: "03",
        name: "File System",
        range: "DAY 56 — 80",
        progress: 0,
    },
    {
        number: "04",
        name: "Networking",
        range: "DAY 81 — 100",
        progress: 0,
    },
    {
        number: "05",
        name: "Shell & User Space",
        range: "DAY 101 — 115",
        progress: 0,
    },
    {
        number: "06",
        name: "Integration & Final",
        range: "DAY 116 — 120",
        progress: 0,
    },
];

/* =========================================================
   ICONS
   ========================================================= */

function ArrowIcon() {
    return <span className="arrow-icon">→</span>;
}

function CheckIcon() {
    return <span className="check-icon">✓</span>;
}

/* =========================================================
   APP
   ========================================================= */

function App() {
    const [selectedDay, setSelectedDay] = useState(2);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [mobileMenu, setMobileMenu] = useState(false);

    const completedDays = days.filter(
        (day) => day.status === "completed"
    ).length;

    const currentDay = days.find((day) => day.status === "current");

    const filteredDays = useMemo(() => {
        return days.filter((day) => {
            const matchesSearch =
                day.title.toLowerCase().includes(search.toLowerCase()) ||
                day.module.toLowerCase().includes(search.toLowerCase());

            const matchesFilter =
                filter === "all" || day.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);

    const selected =
        days.find((day) => day.day === selectedDay) || currentDay;

    return (
        <div className="app">

            {/* =================================================
          SIDEBAR
      ================================================= */}

            <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
                <div className="sidebar-logo">
                    <div className="logo-box">OS</div>

                    <div>
                        <strong>OS PROJECT</strong>
                        <span>PROJECT JOURNAL</span>
                    </div>
                </div>

                <nav>
                    <p className="nav-label">PROJECT</p>

                    <button className="nav-item active">
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button className="nav-item">
                        <span>◫</span>
                        Roadmap
                    </button>

                    <button className="nav-item">
                        <span>◈</span>
                        Architecture
                    </button>

                    <p className="nav-label module-label">MODULES</p>

                    {modules.map((module) => (
                        <button className="module-item" key={module.number}>
                            <span className="module-number">{module.number}</span>

                            <div>
                                <strong>{module.name}</strong>
                                <small>{module.range}</small>
                            </div>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <span className="live-dot"></span>
                    PROJECT ACTIVE
                </div>
            </aside>

            {/* =================================================
          MAIN
      ================================================= */}

            <main className="main">

                {/* TOPBAR */}

                <header className="topbar">
                    <button
                        className="mobile-menu"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        ☰
                    </button>

                    <div className="topbar-title">
                        <span>OPERATING SYSTEM</span>
                        <b>/</b>
                        <strong>PROJECT JOURNAL</strong>
                    </div>

                    <div className="topbar-day">
                        DAY {String(selectedDay).padStart(3, "0")}
                        <span>/ 120</span>
                    </div>
                </header>

                {/* =================================================
            HERO
        ================================================= */}

                <section className="hero">

                    <div className="hero-copy">

                        <div className="eyebrow">
                            <span className="live-dot"></span>
                            4 MONTH BUILD
                        </div>

                        <h1>
                            Building an
                            <br />
                            <span>Operating System.</span>
                        </h1>

                        <p>
                            A day-by-day engineering journal documenting the journey from
                            understanding OS fundamentals to building a working operating
                            system.
                        </p>

                        <div className="hero-buttons">
                            <button className="primary-btn">
                                Continue Journey
                                <ArrowIcon />
                            </button>

                            <button className="secondary-btn">
                                View Roadmap
                            </button>
                        </div>
                    </div>

                    {/* PROJECT PROGRESS */}

                    <div className="progress-card">

                        <div className="progress-header">
                            <div>
                                <span>PROJECT PROGRESS</span>
                                <strong>4 MONTHS</strong>
                            </div>

                            <b>DAY {String(selectedDay).padStart(3, "0")}</b>
                        </div>

                        <div className="progress-ring">
                            <div>
                                <strong>
                                    {Math.round((completedDays / 120) * 100)}%
                                </strong>
                                <span>COMPLETE</span>
                            </div>
                        </div>

                        <div className="progress-info">
                            <div>
                                <strong>{completedDays}</strong>
                                <span>Completed</span>
                            </div>

                            <div>
                                <strong>1</strong>
                                <span>In Progress</span>
                            </div>

                            <div>
                                <strong>{120 - completedDays}</strong>
                                <span>Remaining</span>
                            </div>
                        </div>

                    </div>

                </section>

                {/* =================================================
            CURRENT DAY
        ================================================= */}

                <section className="current-section">

                    <div className="section-header">
                        <div>
                            <span className="section-label">CURRENT MILESTONE</span>

                            <h2>
                                Day {String(currentDay.day).padStart(2, "0")} —{" "}
                                {currentDay.title}
                            </h2>
                        </div>

                        <span className="current-badge">
                            IN PROGRESS
                        </span>
                    </div>

                    <div className="current-card">

                        <div className="current-main">

                            <div className="day-number">
                                <span>DAY</span>
                                <strong>{String(currentDay.day).padStart(2, "0")}</strong>
                            </div>

                            <div>
                                <span className="module-name">
                                    {currentDay.module}
                                </span>

                                <h3>{currentDay.title}</h3>

                                <p>{currentDay.description}</p>

                                <div className="topic-tags">
                                    {currentDay.topics.map((topic) => (
                                        <span key={topic}>{topic}</span>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* MINI ARCHITECTURE */}

                        <div className="mini-architecture">

                            <span className="architecture-label">
                                MEMORY MANAGEMENT FLOW
                            </span>

                            <div className="mini-flow">

                                <div>
                                    <small>01</small>
                                    <strong>RAM</strong>
                                </div>

                                <ArrowIcon />

                                <div>
                                    <small>02</small>
                                    <strong>PMM</strong>
                                </div>

                                <ArrowIcon />

                                <div>
                                    <small>03</small>
                                    <strong>PAGING</strong>
                                </div>

                                <ArrowIcon />

                                <div>
                                    <small>04</small>
                                    <strong>HEAP</strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
            DAY JOURNAL
        ================================================= */}

                <section className="journal-section">

                    <div className="section-header">

                        <div>
                            <span className="section-label">
                                PROJECT JOURNAL
                            </span>

                            <h2>120 days. One OS.</h2>
                        </div>

                        <span className="journal-counter">
                            {filteredDays.length} ENTRIES
                        </span>

                    </div>

                    {/* SEARCH */}

                    <div className="journal-tools">

                        <div className="search-box">
                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search days or topics..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="filters">

                            {["all", "completed", "current", "upcoming"].map(
                                (item) => (
                                    <button
                                        key={item}
                                        className={filter === item ? "selected" : ""}
                                        onClick={() => setFilter(item)}
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                        </div>

                    </div>

                    {/* DAY LIST */}

                    <div className="day-list">

                        {filteredDays.map((day) => (

                            <button
                                className={`day-row ${selectedDay === day.day ? "selected-day" : ""
                                    }`}
                                key={day.day}
                                onClick={() => setSelectedDay(day.day)}
                            >

                                <div className="day-index">
                                    {day.status === "completed" ? (
                                        <CheckIcon />
                                    ) : (
                                        String(day.day).padStart(2, "0")
                                    )}
                                </div>

                                <div className="day-info">

                                    <span>{day.module}</span>

                                    <strong>{day.title}</strong>

                                    <p>{day.description}</p>

                                </div>

                                <div className="day-status">

                                    <span className={`status ${day.status}`}>
                                        {day.status === "current"
                                            ? "IN PROGRESS"
                                            : day.status}
                                    </span>

                                    <ArrowIcon />

                                </div>

                            </button>

                        ))}

                    </div>

                </section>

                {/* =================================================
            SELECTED DAY DETAIL
        ================================================= */}

                {selected && (

                    <section className="detail-section">

                        <div className="detail-header">

                            <span className="section-label">
                                DAY {String(selected.day).padStart(2, "0")}
                            </span>

                            <span className={`status ${selected.status}`}>
                                {selected.status}
                            </span>

                        </div>

                        <h2>{selected.title}</h2>

                        <p className="detail-description">
                            {selected.description}
                        </p>

                        <div className="detail-grid">

                            <div className="detail-box">

                                <span>MODULE</span>

                                <strong>{selected.module}</strong>

                            </div>

                            <div className="detail-box">

                                <span>DAY</span>

                                <strong>
                                    {String(selected.day).padStart(2, "0")} / 120
                                </strong>

                            </div>

                            <div className="detail-box">

                                <span>STATUS</span>

                                <strong>
                                    {selected.status.toUpperCase()}
                                </strong>

                            </div>

                        </div>

                        <div className="topics-section">

                            <span className="section-label">
                                TODAY'S TOPICS
                            </span>

                            <div className="topic-list">

                                {selected.topics.map((topic, index) => (

                                    <div className="topic-card" key={topic}>

                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <strong>{topic}</strong>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </section>

                )}

                {/* =================================================
            MEMORY ARCHITECTURE
        ================================================= */}

                <section className="architecture-section">

                    <div className="section-header">

                        <div>
                            <span className="section-label">
                                SYSTEM ARCHITECTURE
                            </span>

                            <h2>Memory Management Stack</h2>
                        </div>

                    </div>

                    <div className="architecture-stack">

                        <div className="stack-level boot-level">
                            <span>01</span>

                            <div>
                                <strong>Bootloader</strong>
                                <small>Memory Map</small>
                            </div>
                        </div>

                        <div className="stack-connector"></div>

                        <div className="stack-level">
                            <span>02</span>

                            <div>
                                <strong>Physical Memory Manager</strong>
                                <small>Frames · Bitmap · Allocation</small>
                            </div>
                        </div>

                        <div className="stack-connector"></div>

                        <div className="stack-level">
                            <span>03</span>

                            <div>
                                <strong>Paging / Virtual Memory</strong>
                                <small>Pages · Page Tables · Mapping</small>
                            </div>
                        </div>

                        <div className="stack-connector"></div>

                        <div className="stack-level">
                            <span>04</span>

                            <div>
                                <strong>Kernel Heap</strong>
                                <small>kmalloc() · kfree()</small>
                            </div>
                        </div>

                        <div className="stack-connector"></div>

                        <div className="stack-level">
                            <span>05</span>

                            <div>
                                <strong>Process Address Spaces</strong>
                                <small>Isolation · Protection</small>
                            </div>
                        </div>

                    </div>

                </section>

                {/* =================================================
            RAM VISUAL
        ================================================= */}

                <section className="ram-section">

                    <div className="section-header">

                        <div>
                            <span className="section-label">
                                CONCEPT VISUALIZATION
                            </span>

                            <h2>Physical RAM</h2>
                        </div>

                        <span className="mono-note">
                            EXAMPLE MEMORY MAP
                        </span>

                    </div>

                    <div className="ram-container">

                        <div className="ram-bar">

                            <div className="ram-block reserved">
                                <strong>RESERVED</strong>
                                <small>Hardware</small>
                            </div>

                            <div className="ram-block kernel">
                                <strong>KERNEL</strong>
                                <small>OS</small>
                            </div>

                            <div className="ram-block available">
                                <strong>AVAILABLE</strong>
                                <small>Free Frames</small>
                            </div>

                            <div className="ram-block available large">
                                <strong>AVAILABLE</strong>
                                <small>Usable RAM</small>
                            </div>

                            <div className="ram-block reserved">
                                <strong>RESERVED</strong>
                                <small>Protected</small>
                            </div>

                        </div>

                        <div className="ram-legend">

                            <span>
                                <i className="reserved-color"></i>
                                Reserved
                            </span>

                            <span>
                                <i className="kernel-color"></i>
                                Kernel
                            </span>

                            <span>
                                <i className="available-color"></i>
                                Available
                            </span>

                        </div>

                    </div>

                </section>

                {/* =================================================
            FOOTER
        ================================================= */}

                <footer>

                    <div>
                        <strong>OS PROJECT JOURNAL</strong>
                        <span>Building an operating system from scratch.</span>
                    </div>

                    <div>
                        <span>DAY {String(selectedDay).padStart(3, "0")}</span>
                        <span>/ 120</span>
                    </div>

                </footer>

            </main>
        </div>
    );
}

export default App;
