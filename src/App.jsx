import "./App.css";

function App() {
    const roadmap = [
        {
            id: "01",
            title: "Memory Map",
            subtitle: "Understand the RAM layout",
            status: "CURRENT",
            description:
                "Before managing memory, the OS needs to know which parts of RAM are usable and which are reserved.",
            tasks: [
                "Understand physical RAM",
                "Identify reserved regions",
                "Identify usable memory",
                "Read the bootloader memory map",
            ],
        },
        {
            id: "02",
            title: "Physical Memory Manager",
            subtitle: "Manage physical RAM",
            status: "UP NEXT",
            description:
                "Divide usable RAM into fixed-size frames and keep track of which frames are free or occupied.",
            tasks: [
                "4 KB memory frames",
                "Bitmap-based allocation",
                "alloc_frame()",
                "free_frame()",
            ],
        },
        {
            id: "03",
            title: "Paging",
            subtitle: "Build virtual memory",
            status: "PLANNED",
            description:
                "Map virtual pages to physical frames using page tables and give processes their own address spaces.",
            tasks: [
                "Page tables",
                "Virtual → physical mapping",
                "Page permissions",
                "map_page() / unmap_page()",
            ],
        },
        {
            id: "04",
            title: "Kernel Heap",
            subtitle: "Dynamic kernel memory",
            status: "PLANNED",
            description:
                "Create a dynamic memory allocator so the kernel can request and release smaller blocks of memory.",
            tasks: [
                "kmalloc()",
                "kfree()",
                "Free-list allocator",
                "Heap management",
            ],
        },
        {
            id: "05",
            title: "Page Faults",
            subtitle: "Handle invalid memory access",
            status: "PLANNED",
            description:
                "Detect and handle situations where a process accesses a page that is unavailable or not permitted.",
            tasks: [
                "Page fault detection",
                "Fault handler",
                "Permission checks",
                "Demand paging foundation",
            ],
        },
        {
            id: "06",
            title: "Process Address Spaces",
            subtitle: "Isolate processes",
            status: "PLANNED",
            description:
                "Give each process its own virtual address space while keeping the kernel protected.",
            tasks: [
                "Per-process page tables",
                "Process isolation",
                "Kernel mapping",
                "Memory protection",
            ],
        },
    ];

    return (
        <div className="os-page">
            {/* Background */}
            <div className="grid-background" />

            {/* ───────── HEADER ───────── */}
            <header className="topbar">
                <div className="brand">
                    <div className="brand-icon">OS</div>

                    <div>
                        <strong>OUR OS PROJECT</strong>
                        <span>BUILDING FROM SCRATCH</span>
                    </div>
                </div>

                <div className="project-status">
                    <span className="pulse" />
                    PROJECT ACTIVE
                </div>
            </header>

            {/* ───────── HERO ───────── */}
            <section className="hero">
                <div className="breadcrumb">
                    OS PROJECT <span>/</span> SUBSYSTEMS <span>/</span> MEMORY
                </div>

                <div className="hero-grid">
                    <div className="hero-content">
                        <p className="overline">DAY 01 · MEMORY MANAGEMENT</p>

                        <h1>
                            Memory
                            <br />
                            <span>Management</span>
                        </h1>

                        <p className="hero-description">
                            My journey into building the memory management subsystem of our
                            operating system — from understanding physical RAM to creating
                            virtual memory.
                        </p>

                        <div className="hero-meta">
                            <div>
                                <small>PROGRESS</small>
                                <strong>01 / 06</strong>
                            </div>

                            <div>
                                <small>STATUS</small>
                                <strong className="green">IN PROGRESS</strong>
                            </div>

                            <div>
                                <small>EST. TIME</small>
                                <strong>30 DAYS</strong>
                            </div>
                        </div>
                    </div>

                    {/* Architecture graphic */}
                    <div className="architecture-card">
                        <div className="card-label">MEMORY ARCHITECTURE</div>

                        <div className="architecture">
                            <div className="arch-node boot">
                                <span>01</span>
                                <strong>Memory Map</strong>
                                <small>Bootloader</small>
                            </div>

                            <div className="connector">
                                <i />
                            </div>

                            <div className="arch-node">
                                <span>02</span>
                                <strong>PMM</strong>
                                <small>Physical Frames</small>
                            </div>

                            <div className="connector">
                                <i />
                            </div>

                            <div className="arch-node">
                                <span>03</span>
                                <strong>Paging</strong>
                                <small>Virtual Memory</small>
                            </div>

                            <div className="connector">
                                <i />
                            </div>

                            <div className="arch-node">
                                <span>04</span>
                                <strong>Heap</strong>
                                <small>Kernel Memory</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── BIG IDEA ───────── */}
            <section className="big-idea">
                <div className="section-intro">
                    <p className="section-number">01 / THE BIG IDEA</p>

                    <h2>
                        Think of RAM as a
                        <br />
                        <span>parking lot.</span>
                    </h2>

                    <p>
                        The OS is the parking manager. It needs to know which spaces are
                        reserved, which are occupied, and which spaces are available for
                        new programs.
                    </p>
                </div>

                <div className="ram-visual">
                    <div className="ram-header">
                        <span>PHYSICAL RAM</span>
                        <span>MEMORY MAP</span>
                    </div>

                    <div className="ram-layout">
                        <div className="memory-block reserved">
                            <span>RESERVED</span>
                            <small>Hardware / Firmware</small>
                        </div>

                        <div className="memory-block kernel">
                            <span>KERNEL</span>
                            <small>OS occupies this region</small>
                        </div>

                        <div className="memory-block free">
                            <span>AVAILABLE</span>
                            <small>Free frames</small>
                        </div>

                        <div className="memory-block free large">
                            <span>AVAILABLE</span>
                            <small>Memory available to the OS</small>
                        </div>

                        <div className="memory-block reserved">
                            <span>RESERVED</span>
                            <small>Protected region</small>
                        </div>
                    </div>

                    <div className="ram-legend">
                        <span>
                            <i className="legend-reserved" />
                            Reserved
                        </span>

                        <span>
                            <i className="legend-kernel" />
                            Kernel
                        </span>

                        <span>
                            <i className="legend-free" />
                            Available
                        </span>
                    </div>
                </div>
            </section>

            {/* ───────── ROADMAP ───────── */}
            <section className="journey">
                <div className="journey-heading">
                    <div>
                        <p className="section-number">02 / THE JOURNEY</p>
                        <h2>From RAM to<br />virtual memory.</h2>
                    </div>

                    <p>
                        Every layer builds on the previous one. This is the path I will
                        follow while implementing the memory subsystem.
                    </p>
                </div>

                <div className="roadmap">
                    {roadmap.map((item, index) => (
                        <div className="roadmap-row" key={item.id}>
                            <div className="roadmap-index">
                                <span>{item.id}</span>

                                {index !== roadmap.length - 1 && (
                                    <div className="vertical-line" />
                                )}
                            </div>

                            <article
                                className={`roadmap - card ${item.status === "CURRENT" ? "current" : ""
                                    } `}
                            >
                                <div className="roadmap-card-header">
                                    <div>
                                        <p>{item.subtitle}</p>
                                        <h3>{item.title}</h3>
                                    </div>

                                    <span
                                        className={`status ${item.status === "CURRENT"
                                            ? "current-status"
                                            : item.status === "UP NEXT"
                                                ? "next-status"
                                                : ""
                                            } `}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="roadmap-content">
                                    <p>{item.description}</p>

                                    <div className="task-list">
                                        {item.tasks.map((task) => (
                                            <span key={task}>
                                                <b>+</b>
                                                {task}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───────── TRANSLATION ───────── */}
            <section className="translation-section">
                <p className="section-number">03 / CORE CONCEPT</p>

                <h2>
                    Virtual address
                    <span> → </span>
                    physical memory
                </h2>

                <div className="translation-diagram">
                    <div className="translation-node">
                        <small>PROCESS</small>
                        <strong>Virtual Address</strong>
                    </div>

                    <div className="diagram-arrow">
                        <span>PAGE TABLE</span>
                        →
                    </div>

                    <div className="translation-node highlighted">
                        <small>MMU</small>
                        <strong>Address Translation</strong>
                    </div>

                    <div className="diagram-arrow">
                        <span>PHYSICAL MEMORY</span>
                        →
                    </div>

                    <div className="translation-node">
                        <small>RAM</small>
                        <strong>Physical Frame</strong>
                    </div>
                </div>
            </section>

            {/* ───────── FOOTER ───────── */}
            <footer className="footer">
                <span>OS PROJECT JOURNAL</span>

                <span>MEMORY MANAGEMENT · DAY 01</span>

                <span>01 / 30</span>
            </footer>
        </div>
    );
}

export default App;
